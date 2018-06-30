import React from 'react';
import { MultiSelect } from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';

class SelectBar extends React.Component {
    render () {
        return (
            <MultiSelect 
                itemRenderer={
                    (item, props) => {
                        console.log(props);
                        return null;
                    }
                } 
                items={ ['aisdalsndla', 'test2'] } 
                onItemSelect={
                    (item) => console.log(item)
                }/>
        );
    }
} 

export default SelectBar;