import React, {useState} from "react";




export default function App() {
    const [tag, setTag] = useState<string[]>([])
    const [content,setContent]=useState<string>('')
    const [urls, setUrl] = useState<string[]>([])
    const [link,setLink]=useState<string>('')


    const arr={buttons:[
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
        }]}


    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify(arr);
    fetch("http://127.0.0.1:7001/wechat", {method:'POST',headers:myHeaders,body:raw})
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


    // fetch(request)
    //     .then(response => {
    //         if (response.status === 200) {
    //             console.log('success')
    //         } else {
    //             throw new Error('Something went wrong on api server!');
    //         }
    //     })
    //     .then(data => {
    //         console.log(data)
    //         // ...
    //     }).catch(error => {
    //     console.error(error);
    // });

    function show(title: string) {
        setContent(title)
        // 获取二级菜单名
        const text = arr.buttons.filter(item => item.name === title)
        const detail = text[0].sub_button
        if (detail) {
            const data = [detail.map(item => item.name), detail.map(item => item.url)]
            setTag(data[0])
            setUrl(data[1])
        }
        if(text[0].url){
            setLink(text[0].url)
            window.open(text[0].url)
        }else {
            setLink('')
        }
    }

    function goToLink(item: string) {
        setContent(item)
        let index = tag.indexOf(item)
        setLink(urls[index])
        window.open(urls[index])
    }

    function autoResponse(type: 'subscribe' | 'message') {
        if (type === 'subscribe') {
            console.log('thanks for following me.')
        }
        if (type === 'message') {
            console.log(`we've received your message!`)
        }
    }
    // function changeContent(content:string) {
    //     const text= arr.filter(item=>item.name===content)
    //     console.log(text)
    //     if(text){
    //       const lll= arr.findIndex(item=>item.name===text[0].name)
    //         const edit=window.prompt('请输入修改内容:')
    //         if(edit){
    //             arr[lll].name=edit
    //             setContent(arr[1].name)
    //             console.log(arr)
    //         }
    //     }
    // }
    // function changeLink(link:string) {
    //     console.log(link)
    // }
    // function addList() {
    //     const text=window.prompt('输入添加的内容')
    //     if(text){
    //         let tep=JSON.parse(JSON.stringify(arr[0]))
    //         tep.name=text
    //         tep.sub_button=[]
    //         arr.push(tep)
    //
    //     }
    // }

    const title=arr.buttons.map(item => <li key={item.name} onClick={() => show(item.name)}>{item.name}</li>)
    const list = tag.map(item => <li key={item} onClick={() => goToLink(item)}>{item}</li>)

    return (
        <div className="App">
            <div>
                <ul>{title}</ul>
                <ul>
                    {list}
                </ul>
            </div>
            <div>
                <button onClick={() => autoResponse('subscribe')}>订阅</button>
                <button onClick={() => autoResponse('message')}>发消息</button>
            </div>
            {/*<div>*/}
            {/*    编辑*/}
            {/*    <div onClick={()=>changeContent(content)}>{content}</div>*/}
            {/*    <div onClick={()=>changeLink(link)}>{link}</div>*/}
            {/*</div>*/}

        </div>
    );
}