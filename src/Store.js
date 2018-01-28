import React from 'react';
import {observable, action} from 'mobx';

class DropdownStore {
    constructor() {
        this.unfold = true;
        this.clickTimes = 0;
        this.showMask = false;
        this.maskEle = this.mask();
    }

    mask() {
        return (
            <div className="mask"></div>
        );
    }

    init() {
        document.body.appendChild();
    }

    @observable maskEle = null;

    @observable unfold = true;
    @observable clickTimes = 0;

    @action
    changeFoldStatus() {
        this.unfold = !this.unfold;
    }

    @action
    addClick() {
        this.clickTimes++;
    }
}

export default new DropdownStore();