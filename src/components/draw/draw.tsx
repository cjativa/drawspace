import React, { useEffect, useState } from 'react';

import DrawCanvas from './drawCanvas';
import DrawStrokeActions, { FILL_COLORS, STROKE_WIDTHS } from './drawStrokeActions';
import DrawGeneralActions from './drawGeneralActions';

const Draw = () => {

    const [saveOccurred, setSaveOccurred] = useState<boolean>(false);
    const [resetOccurred, setResetOccurred] = useState<boolean>(false);
    const [isPrivate, setIsPrivate] = useState<boolean>(true);

    // Stroke color, width, and usage of erased are toggled via 
    // DrawStrokeActions component and passed from here to DrawCanvas
    const [fillColor, setFillColor] = useState<FILL_COLORS>('red');
    const [strokeWidth, setStrokeWidth] = useState<STROKE_WIDTHS>(10);
    const [eraserOn, setEraserOn] = useState<boolean>(false);

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

    /** Toggles the usage of the eraser */
    const toggleEraser = () => {
        setEraserOn(!eraserOn);
    };

    return (
        <div className="draw">
            <p>Draw to your hearts content ✏️</p>

            {/** Canvas for drawing */}
            <DrawCanvas
                saveOccurred={saveOccurred}
                resetOccurred={resetOccurred}
                fillColor={fillColor}
                strokeWidth={strokeWidth}
                eraserOn={eraserOn}
            />

            {/** Action buttons */}
            <div className="draw__actions">
                <DrawStrokeActions
                    setFillColor={setFillColor}
                    setStrokeWidth={setStrokeWidth}
                    toggleEraser={toggleEraser}
                />

                <DrawGeneralActions
                    onResetClick={onResetClick}
                    onSaveClick={onSaveClick}
                    setIsPrivate={setIsPrivate}
                    isPrivate={isPrivate}
                />
            </div>
        </div>
    )
};

export default Draw;