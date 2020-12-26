

export type FILL_COLORS = 'red' | 'green' | 'yellow' | 'purple' | 'blue';
export type STROKE_WIDTHS = 1 | 5 | 10 | 20 | 30;

const fillColorsList: Array<FILL_COLORS> = ['red', 'green', 'yellow', 'purple', 'blue'];
const strokeWidthsList: Array<STROKE_WIDTHS> = [1, 5, 10, 20, 30];

interface IDrawStrokeActionsProps {
    setFillColor: (color: FILL_COLORS) => void,
    setStrokeWidth: (width: STROKE_WIDTHS) => void,
    toggleEraser: () => void
};

const DrawStrokeActions = (props: IDrawStrokeActionsProps) => {

    /** Updates the selected fill color */
    const onColorClick = (event: any) => {
        props.setFillColor(event.target.name);
    };

    /** Updates the select stroke width */
    const onWidthClick = (event: any) => {
        props.setStrokeWidth(parseInt(event.target.name) as STROKE_WIDTHS);
    };

    return (
        <div className="dsa">

            {/** Generate the buttons for the fill colors */}
            <div className="dsa__colors panel">
                {fillColorsList.map((fillColor, index) => <button
                    key={`${fillColor}__${index}`}
                    name={fillColor}
                    className={`circle-btn ${fillColor}`}
                    onClick={onColorClick}
                    style={{ backgroundColor: fillColor }} />
                )}
            </div>

            {/** Generate the buttons for the stroke widths */}
            <div className="dsa__strokes panel">
                {strokeWidthsList.map((strokeWidth, index) => <button
                    key={`${strokeWidth}__${index}`}
                    name={`${strokeWidth}`}
                    className="stroke"
                    onClick={onWidthClick}
                    style={{ width: `${strokeWidth}px`, height: `30px` }} />
                )}
            </div>

            {/** Container for eraser tool */}
            <div className="dsa__eraser panel">
                <button onClick={() => props.toggleEraser()} />
            </div>
        </div>
    )
};

export default DrawStrokeActions;