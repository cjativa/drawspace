import React, { useEffect, useState } from 'react';

import DrawCanvas from './drawCanvas';

export type FILL_COLORS = 'red' | 'green' | 'yellow' | 'purple' | 'blue';

const Draw = () => {

    const [saveOccurred, setSaveOccurred] = useState<boolean>(false);
    const [resetOccurred, setResetOccurred] = useState<boolean>(false);
    const [fillColor, setFillColor] = useState<FILL_COLORS>('red');

    /** Resets the reset state after a reset occurred */
    useEffect(() => {
        if (resetOccurred === true) {
            setResetOccurred(false);
            setFillColor('red');
        }
    }, [resetOccurred]);

    /** Resets the save state after a save occurred */
    useEffect(() => {
        if (saveOccurred === true) {
            setSaveOccurred(false);
        }
    }, [saveOccurred]);

    /** Performs drawing saving workflow */
    const onSaveClick = () => {
        setSaveOccurred(true);
    };

    /** Performs drawing reset workflow */
    const onResetClick = () => {
        setResetOccurred(true);
    };

    /** Updates the selected fill color */
    const onColorClick = (event: any) => {
        setFillColor(event.target.name);
    };

    return (
        <div className="draw">
            <p>Draw to your hearts content ✏️</p>

            {/** Canvas for drawing */}
            <DrawCanvas
                saveOccurred={saveOccurred}
                resetOccurred={resetOccurred} 
                fillColor={fillColor} />

            {/** Action buttons */}
            <div className="draw__actions">
                <div className="draw__colors">
                    <button name="red" className="circle-btn red" onClick={onColorClick} />
                    <button name="green" className="circle-btn green" onClick={onColorClick} />
                    <button name="yellow" className="circle-btn yellow" onClick={onColorClick} />
                    <button name="purple" className="circle-btn purple" onClick={onColorClick} />
                    <button name="blue" className="circle-btn blue" onClick={onColorClick} />
                </div>

                <div className="draw__buttons">
                    <button
                        className="draw__reset brand-btn"
                        onClick={onResetClick}>
                        Reset Drawing
                    </button>
                    <button
                        className="draw__save brand-btn"
                        onClick={onSaveClick}>
                        Save Drawing
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Draw;