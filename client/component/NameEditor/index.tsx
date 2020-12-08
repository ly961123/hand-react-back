import React, { useEffect, useState, useCallback, useRef, KeyboardEvent, ReactNode } from 'react';
import { message } from 'antd';
import OutsideClickHandler from 'react-outside-click-handler';
import './index.scss';

type IProps = {
  value: string,
  disabled?: boolean,
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

const NameEditor = ({
  value,
  disabled,
  onChange,
}: IProps) => {
  const textElement = useRef(null);
  const inputElement = useRef(null);
  const [rtxList, setRtxList] = useState<string[][]>([]);
  const [rtxOptions, setRtxOptions] = useState<string[]>([]);
  const [rtxOptionsVisible, setRtxOptionsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [inputText, setInputText] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const setFullName = useCallback((name: string) => {
    const list = splitRtxString(name);
    // 失去焦点或格式化value，验证是否编辑了名字，名字是否存在，过滤不存在
    const fullNames = list.map(rtx => {
      const temp = rtxList.filter(rtxRow => rtxRow.includes(rtx));
      return temp[0]?.[1];
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

  // Outside点击事件
  const onRtxItemClick = (e: any) => {
    rtxNamesUpdate(e.target.textContent);
    setInputText('');
    (textElement.current as any).focus();
  };

  // 删除
  const deleteParticle = (e: any) => {
    e.stopPropagation();
    const { currentTarget } = e;
    const list = splitRtxString(userInput);
    const ix = Number(currentTarget.getAttribute('data-ix'));
    list.splice(ix,1);
    setUserInput(`${list.join(';')};`);
  };

  // 获取焦点
  const rtxFocus = () => {
    setIsFocus(true);
    (inputElement.current as any).focus();
  };

  // input失去焦点
  const rtxBlur = () => {
    // 失去焦点，验证是否编辑了名字，名字是否存在，过滤不存在
    const validList = setFullName(inputText);
    const allList = splitRtxString(userInput).concat(validList);
    
    // 去除重复姓名
    const uniqueArray = Array.from(new Set(allList));
    const rtxValue = uniqueArray.join(';') ? `${uniqueArray.join(';')};` : '';
    setUserInput(rtxValue);
    setSelectedIndex(0);
    onChange(rtxValue.replace(BRACKET_REG, ''));
    console.log(rtxValue.replace(BRACKET_REG, ''), '提交的');
    setInputText('');
    setIsFocus(false);
  };

  const rtxNamesUpdate = useCallback((name: string) => {
    let currentInputList = splitRtxString(userInput);
    currentInputList = currentInputList.concat(name);
    setUserInput(`${currentInputList.join(';')};`);
    setRtxOptions([]);
  }, [userInput]);

  // change
  const rtxChange = useCallback((e: any) => {
    const { value } = e.target;
    setInputText(value);
    setRtxOptionsVisible(true);
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

    if (e.key === 'Enter' && rtxOptions.length) {
      // 当前enter选中的人名
      const lastFullRtx = rtxOptions[selectedIndex];
      rtxNamesUpdate(lastFullRtx);
      setRtxOptionsVisible(false);
      setSelectedIndex(0);
      setInputText('');
      return;
    }

    setRtxOptions(currentRtxOptions);
    setInputText(value);
  }, [rtxNamesUpdate, rtxList, rtxOptions, selectedIndex]);

  // 键盘事件
  const onInputKeyPress = useCallback((e: KeyboardEvent) => {
    const keyboardDown = () => {
      const nextSelectIndex = (rtxOptions.length - 1) > selectedIndex
        ? selectedIndex + 1 : (rtxOptions.length - 1);
      setSelectedIndex(nextSelectIndex);
    };
  
    const keyboardUp = () => {
      const nextSelectIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
      setSelectedIndex(nextSelectIndex);
    };
  
    const keyboardBackspace = () => {
      if (!inputText) {
        const list = splitRtxString(userInput);
        list.splice(list.length - 1,1);
        setUserInput(`${list.join(';')};`);
      }
    };

    const keys: Record<string, () => void> = {
      ArrowDown: keyboardDown,
      ArrowUp: keyboardUp,
      Enter: () => rtxChange(e),
      Backspace: keyboardBackspace,
    };
  
    keys[e.key]?.();
  }, [rtxChange, inputText, rtxOptions, selectedIndex, userInput]);

  // 设置input自适应宽度
  useEffect(() => {
    const caculator = document.querySelectorAll<HTMLElement>('.width_caculator')[0];
    const ele = document.querySelectorAll<HTMLElement>('.rtx-editor__input')[0];
    ele.style.width = `${caculator.offsetWidth}px`;
  }, [inputText]);

  const inputEle: ReactNode = userInput.split(';').filter(name => name).map((v, i) =>
    <span key={`text-${i}`} className={`rtx-editor__particle ${disabled && 'particle-disabled'}`} contentEditable={false}>
      <span>{v}</span>
      {!disabled && <span data-ix={i} className='rtx-editor__delete' onClick={deleteParticle}>x</span>}
    </span>);
  const deleteEle: ReactNode = userInput && !disabled && <div className='clear' onClick={() => setUserInput('')}>x</div>;
  const placeholderEle: ReactNode = !inputText && !userInput && <div className='placeholder'>请输入企业微信账号,复制多个用;隔开</div>;

  return (
    <div className='rtx-editor'>
      <div
        className={`rtx-input ${disabled ? 'rtx-input-disabled' : (isFocus ? 'input-focus' : '')}`}
        contentEditable={!disabled}
        suppressContentEditableWarning={true}
        ref={textElement}
        onFocus={rtxFocus}
      >
        {inputEle}
        {/* 设置input自适应宽度 */}
        <input
          className='rtx-editor__input'
          style={{backgroundColor: disabled ? '#f5f5f5' : ''}}
          ref={inputElement}
          onChange={rtxChange}
          onKeyDown={onInputKeyPress}
          onBlur={rtxBlur}
          value={inputText}
        />
        <span className='width_caculator'>{inputText}</span>
        {deleteEle}
        {placeholderEle}
      </div>
      <OutsideClickHandler
        onOutsideClick={() => {
          setRtxOptionsVisible(false);
        }}
      >
        <div className='name_editor_list' style={{ display: rtxOptionsVisible ? 'block' : 'none' }}>
          {
            rtxOptions.map((v, i) =>
              <div
                className={`rtx-granule ${selectedIndex === i ? 'rtx-granule-active' : ''}`}
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