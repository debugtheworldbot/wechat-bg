import React, { useState} from "react";

export default function App() {
    const [tag, setTag] = useState<string[]>([])
    const [content,setContent]=useState<string>('')
    const [urls, setUrl] = useState<string[]>([])
    const [link,setLink]=useState<string>('')

    const arr=[
        {name: "扫码",
        sub_button: [
            {
                name: "扫码带提示",
                url: "https://baidu.com",
                sub_button: []
            },
            {
                name: "扫码推事件",
                url: "https://google.com",
                sub_button: []
            }
        ]},{
            name: "发图",
            sub_button: [
                {
                    name: "系统拍照发图",
                    url: "https://bilibili.com",
                    sub_button: []
                },
                {
                    name: "拍照或者相册发图",
                    url: "https://baidu.com",
                    sub_button: []
                },
                {
                    name: "微信相册发图",
                    url: "https://https://github.com",
                    sub_button: []
                }
            ]},{
            name: '帮助',
            url: 'https://baidu.com'
        }]


    function show(title: string) {
        setContent(title)
        // 获取二级菜单名
        const text = arr.filter(item => item.name === title)
        const detail = text[0].sub_button
        if (detail) {
            const data = [detail.map(item => item.name), detail.map(item => item.url)]
            setTag(data[0])
            setUrl(data[1])
        }
        if(text[0].url){
            setLink(text[0].url)
            // window.open(text[0].url)
        }else {
            setLink('')
        }
    }

    function goToLink(item: string) {
        setContent(item)
        let index = tag.indexOf(item)
        setLink(urls[index])
        // window.open(url[index])
    }

    function autoResponse(type: 'subscribe' | 'message') {
        if (type === 'subscribe') {
            console.log('thanks for following me.')
        }
        if (type === 'message') {
            console.log(`we've received your message!`)
        }
    }
    function changeContent(content:string) {
        const text= arr.filter(item=>item.name===content)
        if(text){
          //const lll= arr.findIndex(item=>item.name===text[0].name)
            const edit=window.prompt('请输入修改内容:')
            if(edit){
                arr[1].name=edit
                setContent(arr[1].name)
            }
        }
    }
    function changeLink(link:string) {
        console.log(link)
    }
    const title= arr.map(item => <li onClick={() => show(item.name)}>{item.name}</li>)
    const list = tag.map(item => <li onClick={() => goToLink(item)}>{item}</li>)

    return (
        <div className="App">
            <div>
                <ul>{title}</ul>
                <ul>
                  {list}
                  <li>+</li>
                </ul>
            </div>
            <div>
                <button onClick={() => autoResponse('subscribe')}>订阅</button>
                <button onClick={() => autoResponse('message')}>发消息</button>
            </div>
            <div>
              编辑
                <div onClick={()=>changeContent(content)}>{content}</div>
                <div onClick={()=>changeLink(link)}>{link}</div>
            </div>

        </div>
    );
}
