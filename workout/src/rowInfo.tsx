import "./rowInfo.css"

type Props = {
    date: string,
    distance: number,
    onRemove: Function
}

export default function RowInfo(props: Props) {

    return (<div className={"rowInfo"}>
        <span className="dataInfo">{props.date}</span>
        <span className="distanceInfo">{props.distance}</span>
        <span className={"deleteBtn"} title={"Удалить"} onClick={() => props.onRemove?.call(null)}></span>
    </div>)
}