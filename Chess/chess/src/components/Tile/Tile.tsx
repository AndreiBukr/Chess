import './Tile.css';

interface Props
{
    img?: string;
    number: number;
}

export default function Tile({number, img}:Props)
{
    if(number%2===0)
    return(<div className="tile black_tile">
        {img && <div className='chess_piece' style={{backgroundImage: `url(${img})`}}></div>}
    </div>)
    else
    return(<div className="tile white_tile">
        {img && <div className='chess_piece' style={{backgroundImage: `url(${img})`}}></div>}
    </div>)
}