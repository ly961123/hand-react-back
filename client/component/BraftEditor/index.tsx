import { Drawer, message } from 'antd';
import { EyeOutlined } from '@ant-design/icons'
import BraftEditor, {
  EditorState,
  ExtendControlType,
} from 'braft-editor';
import 'braft-editor/dist/index.css';
import copy from 'copy-to-clipboard';
import React, { useMemo, useState } from 'react';
import './index.scss';

/**
 * 提交转字符串 description.toRAW()
 * 编辑查看 const braftDesciption = useMemo(() => BraftEditor.createEditorState(description).toHTML(), [description]);
 */

interface IProps {
  placeholder?: string;
  value: any;
  onChange?: (value: EditorState) => void;
  onBlur?: (value: EditorState) => void;
}

const BraftEditorWrap = ({
  placeholder = '',
  value,
  onBlur,
  onChange,
}: IProps) => {
  const [preview, setPreview] = useState(false);
  const editorState = useMemo(() => BraftEditor.createEditorState(value), [value]);
  const extendControls: ExtendControlType[] = [
    {
      key: 'preview', // 控件唯一标识，必传
      type: 'button',
      title: '预览', // 指定鼠标悬停提示文案
      html: null, // 指定在按钮中渲染的html字符串
      text: <EyeOutlined />, // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
      onClick: () => {
        setPreview(true);
      },
    },
    'separator',
    {
      key: 'html copy', // 控件唯一标识，必传
      type: 'button',
      title: '复制成HTML源码', // 指定鼠标悬停提示文案
      html: null, // 指定在按钮中渲染的html字符串
      text: '复制HTML', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
      onClick: () => {
        copy(value ? value.toHTML() : '');
        message.success('复制成功');
      },
    },
  ];

  const myUploadFn = (param: any) => {

    const serverURL = 'http://upload-server'
    const xhr = new XMLHttpRequest
    const fd = new FormData()
  
    const successFn = () => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: xhr.responseText,
        meta: {
          id: 'xxx',
          title: 'xxx',
          alt: 'xxx',
          loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        }
      })
    }
  
    const progressFn = (event: any) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)
    }
  
    const errorFn = () => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    }
  
    xhr.upload.addEventListener('progress', progressFn, false)
    xhr.addEventListener('load', successFn, false)
    xhr.addEventListener('error', errorFn, false)
    xhr.addEventListener('abort', errorFn, false)
  
    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
  
  }

  const media = {
    // uploadFn: (params: any) => {
    //   const simple = new Simple({
    //     file: params.file,
    //     merchantId,
    //     directory,
    //     fileList: [],
    //     mode: UploadMode.NO_OVERWRITE,
    //     fileType: 'normal',
    //     updateFileList: (fileInfo: IFile) => params.success({
    //       fileId: fileInfo.fileId,
    //       name: fileInfo.name,
    //       url: fileInfo.url,
    //     }),
    //     // tslint:disable-next-line: no-empty
    //     succHandle: () => {},
    //     errorHandle: (message: string) => params.error({ msg: message }),
    //   });
    //   simple.upload();
    // },
    uploadFn: myUploadFn,
  };

  const braftDesciption = useMemo(() =>
    BraftEditor.createEditorState(editorState).toHTML(), [editorState]);

  return (
    <>
      <BraftEditor
        media={media}
        extendControls={extendControls}
        // 指定不需要展示的控件
        excludeControls={['remove-styles']}
        value={editorState}
        placeholder={placeholder}
        onChange={(v: EditorState) => onChange?.(v)}
        onBlur={(v: EditorState) => onBlur?.(v)}
      />
      <Drawer
        title='预览'
        width={800}
        visible={preview}
        onClose={() => setPreview(false)}
      >
        {preview && (
          <div
            className='bf-content'
            dangerouslySetInnerHTML={{
              __html: editorState ? braftDesciption : '',
            }}
          />
        )}
      </Drawer>
    </>
  );
};

export default BraftEditorWrap;
