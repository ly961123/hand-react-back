import React, { useEffect, useState, useCallback, useRef } from 'react';
import { message } from 'antd';
import OutsideClickHandler from 'react-outside-click-handler';
import './indexold.scss';

type IProps = {
  value: string,
  onChange: (value: string) => void;
};

const BRACKET_REG = /\([^()]*\)/ig;

const fetchRtxUsers = () => new Promise((resolve, reject) => {
  const arrusers = (window as any)._arrusers;
  // 返回类似./users.json
  if (!arrusers) {
    const script = document.createElement('script');
    script.onload = () => resolve((window as any)._arrusers);
    script.onerror = () => {
      reject();
    };
    document.getElementsByTagName('head')[0].appendChild(script);
    script.src = 'https://top.oa.com/js/users.js';
  } else {
    resolve(arrusers);
  }
});
const defaultCN = 'ant-select-item ant-select-item-option';

const NameEditor = ({
  value,
  onChange,
}: IProps) => {
  const rtxInputElement = useRef(null);
  const [rtxList, setRtxList] = useState<string[][]>([]);
  const [rtxOptions, setRtxOptions] = useState<string[]>([]);
  const [rtxOptionsVisible, setRtxOptionsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [actionKey, setActionKey] = useState('');
  const [userInput, setUserInput] = useState('');

  const setFullName = useCallback((name: string) => {
    const list = splitRtxString(name);
    // 失去焦点或格式化value，验证是否编辑了名字，名字是否存在，过滤不存在
    const fullNames = list.map(rtx => {
      const temp = rtxList.filter(rtxRow => rtxRow.includes(rtx));
      return temp[0] ? temp[0][1] : undefined;
    }).filter(name => name);
    return fullNames;
  }, [rtxList]);

  useEffect(() => {
    fetchRtxUsers()
      .then((rtxFullList: any) => {setRtxList(rtxFullList)})
      .catch(() => message.error('请确定当前是否在内网办公环境并且使用Chrome!'));
  }, []);

  useEffect(() => {
    if (!value) {
      return;
    }
    const validList = setFullName(value);
    const rtxValue = validList.join(';') ? `${validList.join(';')};` : '';
    setUserInput(rtxValue);
  }, [setFullName, value]);

  // 以;分割多个，转数组
  const splitRtxString = (input: string) => input.split(';').filter((v: string) => v !== '');

  const namesUpdate = useCallback((name: string, deleteCount = 1) => {
    let currentInputList = splitRtxString(userInput);
    // 判断是否为enter还是点击添加
    // enter：替换最后字符
    if (deleteCount) {
      currentInputList.splice(currentInputList.length - 1, deleteCount, name);
    } else {
      // 点击会失去焦点，会过滤点非名字集，所以用concat添加
      currentInputList = currentInputList.concat(name);
    }
    setUserInput(`${currentInputList.join(';')};`);
    setRtxOptions([]);
  }, [userInput]);

  const areaChange = (e: any) => {
    setRtxOptionsVisible(true);
    const { value } = e.target;
    // 去掉换行
    const inputValue = value.replace(/(\r\n|\n|\r)/gm, '');
    // 以;分割多个，转数组
    const rtxNames = splitRtxString(inputValue);
    const lastRtx = rtxNames[rtxNames.length - 1];
    const currentRtxOptions = lastRtx
      ? rtxList
        .filter(rtxRow => rtxRow[1].includes(lastRtx))
        .slice(0, 20)
        .map(rtxRow => rtxRow[1])
      : [];

    if (actionKey === 'Enter' && rtxOptions.length) {
      setActionKey('');
      // 当前enter选中的人名
      const lastFullRtx = rtxOptions[selectedIndex];
      namesUpdate(lastFullRtx);
      setRtxOptionsVisible(false);
      setSelectedIndex(0);
      setActionKey('');
      return;
    }

    setUserInput(inputValue);
    setRtxOptions(currentRtxOptions);
  };

  // 键盘事件
  const onRtxInputKeyPress = useCallback((e: any) => {
    setActionKey(e.key);
    if (e.key === 'ArrowDown') {
      const nextSelectIndex = (rtxOptions.length - 1) > selectedIndex
        ? selectedIndex + 1 : (rtxOptions.length - 1);
      setSelectedIndex(nextSelectIndex);
    }

    if (e.key === 'ArrowUp') {
      const nextSelectIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
      setSelectedIndex(nextSelectIndex);
    }
  }, [rtxOptions, selectedIndex]);

  // 失去焦点时，校验所有人名，删除非法人名
  const onRtxInputBlur = () => {
    // 失去焦点，验证是否编辑了名字，名字是否存在，过滤不存在
    const validList = setFullName(userInput);
    // 去除重复姓名
    const uniqueArray = Array.from(new Set(validList));
    const rtxValue = uniqueArray.join(';') ? `${uniqueArray.join(';')};` : '';
    setUserInput(rtxValue);
    onChange(rtxValue.replace(BRACKET_REG, ''));
    setSelectedIndex(0);
  };

  const onRtxItemClick = (e: any) => {
    namesUpdate(e.target.textContent, 0);
    (rtxInputElement.current as any).focus();
  };

  return (
    <div className='rtx-editor'>
      <textarea
        className='ant-input'
        rows={4}
        onChange={areaChange}
        onBlur={onRtxInputBlur}
        onKeyDown={onRtxInputKeyPress}
        value={userInput}
        ref={rtxInputElement}
      />
      <OutsideClickHandler
        onOutsideClick={() => {
          setRtxOptionsVisible(false);
        }}
      >
        <div className='name_editor_list' style={{ display: rtxOptionsVisible ? 'block' : 'none' }}>
          {
            rtxOptions.map((v, i) =>
              <div
                className={selectedIndex !== i ? defaultCN : `${defaultCN} ant-select-item-option-active`}
                onClick={onRtxItemClick}
                key={i}>{v}</div>
            )
          }
        </div>
      </OutsideClickHandler>
    </div>
  )
};

export default NameEditor;