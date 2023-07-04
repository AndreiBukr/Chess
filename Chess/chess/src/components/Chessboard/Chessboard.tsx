import { useEffect, useRef, useState } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';

const v_axis = ['1','2','3','4','5','6','7','8'];
const o_axis = ['A','B','C','D','E','F','G','H'];

interface Piece{
    img: string;
    x: number;
    y: number;
}

export default function Chessboard()
{ 
    let activeElement: HTMLElement | null = null;
    const chessboardRef = useRef<HTMLDivElement>(null);
    const initialBoardState: Piece[] = [];
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    let p_poz_x: Number;
    let p_poz_y: Number;

    for(let i=0; i<2; i++)
    {
        const type= i === 0 ? "b" : "w";
        const poz_y= i === 0 ? 7 : 0;
        initialBoardState.push({ img: `assets/images/rook_${type}.png`,y: 0 , x: poz_y});
        initialBoardState.push({ img: `assets/images/knight_${type}.png`,y: 1 , x: poz_y});
        initialBoardState.push({ img: `assets/images/bishop_${type}.png`,y: 2 , x: poz_y});
        initialBoardState.push({ img: `assets/images/queen_${type}.png`,y: 3 , x: poz_y});
        initialBoardState.push({ img: `assets/images/king_${type}.png`,y: 4 , x: poz_y});
        initialBoardState.push({ img: `assets/images/bishop_${type}.png`,y: 5 , x: poz_y});
        initialBoardState.push({ img: `assets/images/knight_${type}.png`,y: 6 , x: poz_y});
        initialBoardState.push({ img: `assets/images/rook_${type}.png`,y: 7 , x: poz_y});
    }

    for(let j=0; j<8; j++)
    {
        initialBoardState.push({ img: `assets/images/pawn_b.png`,x: 6 , y: j});
        initialBoardState.push({ img: `assets/images/pawn_w.png`,x: 1 , y: j});
    }


    function grab_piece(e: React.MouseEvent)
    {
        let element = e.target as HTMLElement;
        if(element.classList.contains("chess_piece") && e.button === 0 && chessboardRef.current)
        {
            const x_c = e.clientX -447;
            const y_c = e.clientY -33;
            element.style.left = `${x_c}px`
            element.style.top = `${y_c}px`
            element.style.position = 'absolute'
            activeElement=element;

            const min_x = chessboardRef.current.offsetLeft + 650;
            const min_y = chessboardRef.current.offsetTop + 650;
            const max_x = chessboardRef.current.offsetLeft + chessboardRef.current.clientWidth - 714;
            const max_y = chessboardRef.current.offsetTop + chessboardRef.current.clientHeight - 714;
            activeElement.style.position = 'absolute'

            if(x_c > min_x)
                activeElement.style.left = `${min_x}px`
            else if(x_c < max_x)
                activeElement.style.left = `${max_x}px`
                else
                    activeElement.style.left = `${x_c}px`

            if(y_c > min_y)
                activeElement.style.top = `${min_y}px`
            else if(y_c < max_y)
                activeElement.style.top = `${max_y}px`
                else
                    activeElement.style.top = `${y_c}px`
            
            p_poz_y = Math.abs(Math.round((e.clientX-459)/88));
            p_poz_x = Math.abs(Math.round((e.clientY-688)/88));
        }
        
    }

    function move_piece(e: React.MouseEvent)
    {
        if(activeElement && chessboardRef.current && e.button === 0)
        {
            const min_x = chessboardRef.current.offsetLeft + 650;
            const min_y = chessboardRef.current.offsetTop + 650;
            const max_x = chessboardRef.current.offsetLeft + chessboardRef.current.clientWidth - 714;
            const max_y = chessboardRef.current.offsetTop + chessboardRef.current.clientHeight - 714;
            const x_c = e.clientX - 447;
            const y_c = e.clientY - 33;
            activeElement.style.position = 'absolute'

            if(x_c > min_x)
                activeElement.style.left = `${min_x}px`
            else if(x_c < max_x)
                activeElement.style.left = `${max_x}px`
                else
                    activeElement.style.left = `${x_c}px`

            if(y_c > min_y)
                activeElement.style.top = `${min_y}px`
            else if(y_c < max_y)
                activeElement.style.top = `${max_y}px`
                else
                    activeElement.style.top = `${y_c}px`
        }
    }

    function drop_piece(e: React.MouseEvent)
    {
        if(activeElement && e.button === 0)
        {
            setPieces((value) => {
                const pieces = value.map(p => {
                    if(p.x === p_poz_x && p.y === p_poz_y)
                    {
                        p.y = Math.abs(Math.round((e.clientX-459)/88));
                        p.x = Math.abs(Math.round((e.clientY-688)/88));
                    }
                    return p;
                });
                return pieces;
            })
            activeElement=null;
        }
    }

    let board = [];

    for(let i=v_axis.length-1; i>=0; i--)
        for(let j=0; j<o_axis.length; j++)
        {
            const number=i+j+2;
            let img=undefined;

            pieces.forEach((p) => {
                if(p.x===i && p.y===j)
                    img = p.img;
            });

            board.push(<Tile 
                key={`${i},${j}`} 
                img={img} 
                number={number}></Tile>);
        }

    return <div 
        onMouseUp={e => drop_piece(e)} 
        onMouseMove={e => move_piece(e)} 
        onMouseDown={e => grab_piece(e)} 
        id='chessboard'
        ref = {chessboardRef}
        >
        {board}
    </div>
}