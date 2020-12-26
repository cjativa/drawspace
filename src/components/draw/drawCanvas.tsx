import React, { useState, useRef, useEffect } from 'react';

import { FILL_COLORS, STROKE_WIDTHS } from './drawStrokeActions';

interface IDrawCanvasProps {
    saveOccurred: boolean,
    resetOccurred: boolean,
    fillColor: FILL_COLORS,
    strokeWidth: STROKE_WIDTHS
};

const DrawCanvas = (props: IDrawCanvasProps) => {

    const canvasElement = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D>();
    const [isDrawing, setIsDrawing] = useState(false);
    const [previousPosition, setPreviousPosition] = useState<any>({});

    const figureLine = [];

    /** Sets up our canvas and context on component mounting */
    useEffect(() => {
        canvasElement.current!.width = 1000;
        canvasElement.current!.height = 800;
        setContext(canvasElement.current!.getContext('2d')!);
    }, []);

    /** Once context is ready, styke it */
    useEffect(() => {
        if (context) {
            context.lineJoin = 'round';
            context.lineCap = 'round';
        }
    }, [context]);

    /** Handles resetting the canvas */
    useEffect(() => {
        if (props.resetOccurred) {
            context!.clearRect(0, 0, canvasElement.current!.width, canvasElement.current!.height);
        }
    }, [props.resetOccurred, context]);

    /** Function that handles drawing on mouse down */
    const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

        // Set that we should be drawing and store offsets of the mouse position
        setIsDrawing(true);
        setPreviousPosition({
            offsetX: event.nativeEvent.offsetX,
            offsetY: event.nativeEvent.offsetY
        });
    };

    /** Function that handles drawing the figure as the mouse moves */
    const onMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

        // If drawing should be occurring, track the start and stop locations of the figure
        if (isDrawing) {
            const currentPosition = {
                offsetX: event.nativeEvent.offsetX,
                offsetY: event.nativeEvent.offsetY
            };

            // Store the position of the mouse to the figure and draw it on canvas
            figureLine.push(currentPosition);
            performDrawing(currentPosition);
        }
    };

    /** Function that handles pausing drawing */
    const pauseDrawing = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (isDrawing) {
            setIsDrawing(false);
        }
    };

    /** Performs drawing and stroking on the canvas */
    const performDrawing = (newPosition: { offsetX: number, offsetY: number }) => {
        const { offsetX, offsetY } = newPosition;

        context!.beginPath();
        context!.strokeStyle = props.fillColor;
        context!.lineWidth = props.strokeWidth;

        // Draw a line from the previous position to the current one
        context!.moveTo(previousPosition.offsetX, previousPosition.offsetY);
        context!.lineTo(offsetX, offsetY);
        context!.stroke();

        setPreviousPosition({ offsetX, offsetY });
    };

    return (
        <div className="draw-canvas">
            <canvas className="canvas"
                style={{ background: 'black' }}
                ref={canvasElement}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseLeave={pauseDrawing}
                onMouseUp={pauseDrawing}
            />
        </div>
    )
};

export default DrawCanvas;