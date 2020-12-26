import React, { useEffect, useState } from 'react';

import DrawCanvas from './drawCanvas';
import DrawStrokeActions, { FILL_COLORS, STROKE_WIDTHS } from './drawStrokeActions';


const Draw = () => {

    const [saveOccurred, setSaveOccurred] = useState<boolean>(false);
    const [resetOccurred, setResetOccurred] = useState<boolean>(false);
    const [fillColor, setFillColor] = useState<FILL_COLORS>('red');
    const [strokeWidth, setStrokeWidth] = useState<STROKE_WIDTHS>(10);

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

    return (
        <div className="draw">
            <p>Draw to your hearts content ✏️</p>

            {/** Canvas for drawing */}
            <DrawCanvas
                saveOccurred={saveOccurred}
                resetOccurred={resetOccurred}
                fillColor={fillColor}
                strokeWidth={strokeWidth} />

            {/** Action buttons */}
            <div className="draw__actions">
                <DrawStrokeActions
                    setFillColor={setFillColor}
                    setStrokeWidth={setStrokeWidth}
                />

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