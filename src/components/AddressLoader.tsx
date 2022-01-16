import $ from "jquery";
import React from "react";
import { SearchResult } from "../data/interfaces/types";
import { getSearch } from "../data/LuoguAPI";


export const loadAddress = (slogan: string, callback: (arg0: JSX.Element[]) => void) => {
    if (slogan === ""){
        callback([]); return;
    }

    slogan += " ";
    let slgs = slogan.matchAll(/@(\S+)\s/g);
    let slgList: SearchResult[] = [], resList: JSX.Element[] = [];

    let cur = slgs.next();

    while (!cur.done){
        let c: SearchResult = cur.value;
        ++ c.index;
        c.endIdx = c.index + c[1].length;
        slgList.push(c);
        resList.push(<span>{c[1]}</span>);
        cur = slgs.next();
    }

    const doCallback = () => {
        let ret: JSX.Element[] = [];
        let lastIdx = 0;
        slogan = slogan.substring(0, slogan.length - 1);
        for (let i = 0; i < slgList.length; i ++){
            ret.push(<span>{slogan.substring(lastIdx, slgList[i].index)}</span>);
            ret.push(resList[i]);
            lastIdx = slgList[i].endIdx;
        }
        ret.push(<span>{slogan.substring(lastIdx)}</span>);
        callback(ret);
    };

    if(slgList.length == 0){
        doCallback(); return;
    }
    let unfAjax = slgList.length;

    for (let i = 0; i < slgList.length; i ++){
        let ajaxId = i;
        let nameStr: string = slgList[ajaxId][1];
        $.ajax({
            url: getSearch(nameStr),
            type: "GET",
            success: (data) => {
                data = data.users;
                for (let i = 0; i < data.length; i ++)
                    if (data[i] !== null && data[i].name === nameStr){
                        resList[ajaxId] = <a href={`/user/${data[i].uid}`}>{nameStr}</a>;
                        break;
                    }
                if (-- unfAjax === 0)
                    doCallback();
            },
            error: () => {
                if (-- unfAjax === 0)
                    doCallback();
            }
        });
    }
};
