import { PureComponent } from 'react';

class Date extends PureComponent {

    getFormatedDate = () => {
        const { children } = this.props;
        if(children instanceof window.Date) {
            let [year, month, day] = [children.getFullYear(), children.getMonth(), children.getDate()];
            month = month < 9 ? `0${month+1}` : month+1;
            day = day < 9 ? `0${day}` : day;
            return `${day}-${month}-${year}`;
        } else return children;
    }

    render() {
        return this.getFormatedDate();
    }

}

export default Date;