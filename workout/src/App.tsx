import './App.css'
import React, {Component} from "react";
import RowInfo from "./rowInfo.tsx";
import dateFormat from "dateformat"


const dateNow: string = dateFormat(new Date(), "dd.mm.yy").toString();

class App extends Component {
    state: {
        dates: Array<string>,
        fullData: Array<{ date: string, distance: number }>,
        inputDateValue: string,
        inputDistanceValue: number
    } = {
        dates: [],
        fullData: [],
        inputDateValue: dateNow,
        inputDistanceValue: 0
    }

    onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // @ts-ignore
        const formData = new FormData(e.target)
        const date = Object.fromEntries(formData).date.toString()
        const distance = parseInt(Object.fromEntries(formData).distance.toString())

        if (this.state.dates.length !== 0 && this.state.dates.includes(date)) {
            const fullData = this.state.fullData.map(x => {
                x.distance = x.date === date ? x.distance + distance : x.distance;
                return x
            })
            this.setState({fullData: fullData, inputDateValue: dateNow, inputDistanceValue: 0})
        } else {
            this.setState({
                dates: [...this.state.dates, date],
                fullData: [...this.state.fullData, {date, distance}],
                inputDateValue: dateNow,
                inputDistanceValue: 0
            })
        }

    }

    onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name === "date") {
            this.setState({inputDateValue: e.target.value})
        } else {
            const value = parseInt(e.target.value)
            this.setState({inputDistanceValue: value})
        }
    }

    deleteRow(index: number) {
        let newDates = this.state.dates;
        let newFulldata = this.state.fullData;

        const dateForDelete = newFulldata[index].date;
        newDates = newDates.filter(date => date !== dateForDelete);
        newFulldata = newFulldata.filter(data => data.date !== dateForDelete)

        this.setState({dates: newDates, fullData: newFulldata})
    }

    render() {

        return (
            <div className='container'>
                <div className="wrp">
                    <form onSubmit={this.onFormSubmit.bind(this)} autoComplete="off">
                        <div className="inputWrp">
                            <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                            <input name="date" pattern={"[0-9]{2}.[0-9]{2}.[0-9]{2}"} value={this.state.inputDateValue}
                                   onChange={this.onChangeInput.bind(this)} required/>
                        </div>
                        <div className="inputWrp">
                            <label htmlFor="distance">Пройдено км</label>
                            <input name="distance" pattern={"[0-9]+"} value={this.state.inputDistanceValue}
                                   onChange={this.onChangeInput.bind(this)}
                                   required/>
                        </div>
                        <button className="formBtn" type="submit">ok</button>
                    </form>
                    <div className="tableInfo">
                        <div className="columnNameWrp">
                            <span className="columnName">Дата (ДД.ММ.ГГ)</span>
                            <span className="columnName">Пройдено км</span>
                            <span className="columnName">Действия</span>
                        </div>
                        <div className="tableResults">
                            {this.state.fullData.map((data, index) => <RowInfo key={index} date={data.date}
                                                                               distance={data.distance}
                                                                               onRemove={() => this.deleteRow(index)}/>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
