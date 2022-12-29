import React, { useEffect, useState } from 'react';

const Accordian = props => {
    const { data = [] } = props;
    const [accData, setAccData] = useState(data);

    useEffect(() => {
        setPanelHeight(".panel-1", false);
    }, []);

    const handleClick = (curAcc) => {
        const newACC = [...accData];

        newACC.forEach((acc) => {
            if (curAcc.id === acc.id) {
                acc.state = "aacactive";
                setPanelHeight(`.panel-${acc.id}`, false);
            } else {
                acc.state = null;
                setPanelHeight(`.panel-${acc.id}`, true);
            }
        });  

        setAccData(newACC);
    }    

    const setPanelHeight = (selector, close) => {
        const panel = document.querySelector(`${selector}`);
        panel.style.maxHeight = close === true ? null :  "fit-content";
    }

    const newAccItems = accData.map((item, index) => {
        return (
            <React.Fragment key={item.id}>
                <div className={`accordion-2 ${item.state}`} onClick={() => handleClick(item)}>{item.name}</div>
                <div className={`panel panel-${item.id}`}>
                    {item.content()}
                </div>
            </React.Fragment>
        );
    });

    return (
        <div>
            {newAccItems}
        </div>
    );
}

export default Accordian;