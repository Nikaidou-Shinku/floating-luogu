import $ from "jquery";
import React from "react";
import { SearchResult } from "../data/interfaces/types";
import { getSearch } from "../data/LuoguAPI";

const URLRegex = /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;

const parseURL = (info: string): JSX.Element[] => {
    let resList: JSX.Element[] = [];
    let iter = info.matchAll(URLRegex);
    let cur = iter.next();
    let lastIdx = 0;

    while (!cur.done){
        let c: SearchResult = cur.value;
        resList.push(<span>{info.substring(lastIdx, c.index)}</span>);
        resList.push(<a target="_blank" href={c[0]}>{c[0]}</a>);
        lastIdx = c.index + c[0].length;
        cur = iter.next();
    }

    resList.push(<span>{info.substring(lastIdx)}</span>);
    return resList;
};

export const loadAddress = (slogan: string, callback: (arg0: JSX.Element[]) => void) => {
    if (slogan === ""){
        callback([]); return;
    }

    let slgs = (slogan + " ").matchAll(/@(\S+)\s/g);
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
        for (let i = 0; i < slgList.length; i ++){
            ret = ret.concat(parseURL(slogan.substring(lastIdx, slgList[i].index - 1)));
            ret.push(<span>@</span>, resList[i]);
            lastIdx = slgList[i].endIdx;
        }
        ret = ret.concat(parseURL(slogan.substring(lastIdx)));
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
