import React, { useState} from 'react';
import styled from 'styled-components';



const Ul=styled.ul`
  cursor: pointer;
  font-size: 20px;
`


export default function App(){

    const [tag, setTag] = useState<string[]>([])
    const [content, setContent] = useState<string>('')
    const [urls, setUrl] = useState<string[]>([])
    const [link, setLink] = useState<string>('')
    const [level1, setLevel1] = useState(-1)
    const [toggle,setToggle]=useState(false)


    const arr = {
        buttons: [
            {
                name: "扫码", subButtons: [
                    {
                        name: "扫码带提示",
                        url: "https://baidu.com",
                        type: "view",
                    },
                    {
                        name: "扫码推事件",
                        url: "https://google.com",
                        type: "view",
                    }
                ]
            }, {
                name: "发图", subButtons: [
                    {
                        name: "系统拍照发图",
                        url: "https://bilibili.com",
                        type: "view",

                    },
                    {
                        name: "拍照或者相册发图",
                        url: "https://baidu.com",
                        type: "view",

                    },
                    {
                        name: "微信相册发图",
                        url: "https://github.com",
                        type: "view",
                    }
                ]
            }, {
                name: '帮助',
                url: 'https://baidu.com'
            }]
    }
    const [Arr, setArr] = useState(arr)

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify(Arr);
    fetch("https://test-api-wecare.medtreehealth.com/v2/api-docs?group=wechat", {
        method: 'POST',
        headers: myHeaders,
        body: raw
    })
        .then(response => response.text())
        .catch(error => console.log('error', error));


    function show(title: string, index: number) {
        setContent(title)
        setLevel1(index)
        // 获取二级菜单名
        const text = Arr.buttons.filter(item => item.name === title)
        const detail = text[0].subButtons
        if (detail) {
            const data = [detail.map(item => item.name), detail.map(item => item.url)]
            setTag(data[0])
            setUrl(data[1])
        }
        if (text[0].url) {
            setLink(text[0].url)
        } else {
            setLink('')
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


    function changeList(item: string, index: number) {
        // @ts-ignore
        Arr.buttons[level1].subButtons[index].name = window.prompt('change?') || Arr.buttons[level1].subButtons[index].name
        setArr(Arr)
        show(Arr.buttons[level1].name,level1)
    }
    function changeUrl(url:string,index:number) {
        // @ts-ignore
        Arr.buttons[level1].subButtons[index].url = window.prompt('change?') || Arr.buttons[level1].subButtons[index].url
        setArr(Arr)
        show(Arr.buttons[level1].name,level1)
    }

    function addTitle(name:string,link:string) {

        // @ts-ignore
        setArr({...Arr},{name:name, url: link})
    }

    const title = Arr.buttons.map((item, index) => <li key={item.name}
                                                       onClick={() => show(item.name, index)}>{item.name}</li>)
    const list = tag.map((item, index) => <li onClick={() => {
        changeList(item, index)
    }}>{item}</li>)
    const url=urls.map((url, index) => <li onClick={() => {
        changeUrl(url, index)
    }}>{url}</li>)


    return (
            <div>
                <div>
                    <Ul>
                        <h2>主菜单</h2>
                        {title}
                        {link}
                        {/* eslint-disable-next-line no-restricted-globals */}
                        <div onClick={()=>{addTitle(name,link)}}>{Arr.buttons.length===1?'':`+`}</div>

                    </Ul>
                    <Ul>
                        <h1>子菜单</h1>
                        {list}
                    </Ul>
                    <Ul>

                        {url}
                    </Ul>
                </div>
            </div>
    );
};

