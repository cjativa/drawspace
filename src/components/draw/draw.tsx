import React, { useEffect, useState } from 'react';

import DrawCanvas from './drawCanvas';

const Draw = () => {

    const [saveOccurred, setSaveOccurred] = useState<boolean>(false);
    const [resetOccurred, setResetOccurred] = useState<boolean>(false);

    /** Resets the reset state after a reset occurred */
    useEffect(() => {
        if (resetOccurred === true) {
            setResetOccurred(false);
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
            <p>Draw to your hearts content!</p>

            {/** Canvas for drawing */}
            <DrawCanvas
                saveOccurred={saveOccurred}
                resetOccurred={resetOccurred} />

            {/** Action buttons */}
            <div className="draw__actions">
                <button
                    className="draw__reset"
                    onClick={onResetClick}>
                    Reset Drawing
                </button>
                <button
                    className="draw__save"
                    onClick={onSaveClick}>
                    Save Drawing
                </button>
            </div>
        </div>
    )
};

export default Draw;