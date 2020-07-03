import React, {useState} from "react";

export default function App() {
    const [tag, setTag] = useState<string[]>([])
    const [url, setUrl] = useState<string[]>([])
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
        // 获取二级菜单名
        const text = arr.filter(item => item.name === title)
        const detail = text[0].sub_button
        if (detail) {
            const data = [detail.map(item => item.name), detail.map(item => item.url)]
            setTag(data[0])
            setUrl(data[1])
        } else {
            window.open(text[0].url)
        }
    }

    function goToLink(item: string) {
        let index = tag.indexOf(item)
        window.open(url[index])
    }

    function autoResponse(type: 'subscribe' | 'message') {
        if (type === 'subscribe') {
            console.log('thanks for following me.')
        }
        if (type === 'message') {
            console.log(`we've received your message!`)
        }
    }

    const title = arr.map(item => <li onClick={() => show(item.name)}>{item.name}</li>)

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
              {title}
            </div>

        </div>
    );
}
