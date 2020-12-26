import React from 'react';

interface DrawGeneralActionsProps {
    onResetClick: () => void,
    onSaveClick: () => void,
    setIsPrivate: (isPrivate: boolean) => void,
    isPrivate: boolean
}

const DrawGeneralActions = (props: DrawGeneralActionsProps) => {

    /** Handles different radio buttons being selected */
    const onPrivacyChange = (value: string) => {
        if (value === 'public') {
            props.setIsPrivate(false);
        }

        else if (value === 'private') {
            props.setIsPrivate(true);
        }
    };

    return (
        <div className="dga">

            {/** Buttons for selecting public/private attribute of the drawing */}
            <div className="dga__privacy panel">
                <div className="dpa__rb" onClick={(event) => onPrivacyChange('public')}>
                    <input type="radio" name="privacy" value="public"
                        checked={props.isPrivate === false}
                        onChange={(event) => onPrivacyChange(event.target.value)}
                    />
                    <label>Public</label>
                </div>
                <div className="dpa__rb" onClick={(event) => onPrivacyChange('private')}>
                    <input type="radio" name="privacy" value="private"
                        checked={props.isPrivate === true}
                        onChange={(event) => onPrivacyChange(event.target.value)} />
                    <label>Private</label>
                </div>
            </div>

            {/** Buttons for saving/resetting the drawing */}
            <div className="dga__buttons">
                <button
                    className="dga__reset brand-btn"
                    onClick={props.onResetClick}>
                    Reset Drawing
                    </button>
                <button
                    className="dga__save brand-btn"
                    onClick={props.onSaveClick}>
                    Save Drawing
                    </button>
            </div>
        </div>
    )
};

export default DrawGeneralActions;