import React, {Component} from "react";
import classes from "./Layout.module.css"
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component {
    state = {
        menu: false
    };

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    };

    menuCloseHandler = () => {
        this.setState({
            menu: false
        });
    };

    render() {
        return (
            <div className={classes.Layout}>
                <div>
                    <MenuToggle
                        onToggle={this.toggleMenuHandler}
                        isOpen={this.state.menu}
                    />
                    <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler}/>
                </div>
                <main>
                    { this.props.children }
                </main>
            </div>
        )
    }
}

export default Layout;
