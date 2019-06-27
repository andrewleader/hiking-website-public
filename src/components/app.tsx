import * as React from 'react';

import Header from './header';
import Button from '@material-ui/core/Button';
import Main from './main';
import Menu from './menu';

interface AppState {
    listItems: string[];
    disabled: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        // We initialise its state by using the `props` that were passed in when it
        // was first rendered. We also want the button to be disabled until the
        // App component has fully mounted on the DOM
        this.state = { listItems: this.props.listItems, disabled: true };
    }

    // Once the App component has been mounted, we can enable the button
    componentDidMount() {
        this.setState({ disabled: false });
    }

    // Update the state whenever its clicked by adding a new item to
    // the list - imagine this being updated with the results of AJAX calls, etc
    handleAdd = () => {
        this.setState(prevState => ({
            listItems: prevState.listItems.concat('Item ' + prevState.listItems.length),
        }));
    };

    handleSort = () => {
        this.setState(prevState => ({
            listItems: prevState.listItems.sort(),
        }));
    };

    render() {
        const { menuItems } = this.props;
        const { listItems, disabled } = this.state;

        return (
            <div>
                <Menu items={menuItems} />
                <Main>
                    <Header title="Hello React" sub="This is an example using React & TypeScript and it auto refreshes???" />
                    <ul>
                        {listItems.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                    <Button
                        onClick={this.handleAdd}
                        disabled={disabled}
                        color="primary"
                    >Add item</Button>
                    <span>&nbsp;</span>
                    <Button
                        onClick={this.handleSort}
                        disabled={disabled}
                        color="secondary">
                        Sort items</Button>
                </Main>
            </div>
        );
    }
}
