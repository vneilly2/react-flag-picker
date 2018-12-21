import React, { Component } from 'react';
import { Input, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class SearchBox extends Component {

    constructor(props) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.options = this.options.bind(this);
        this.filterOptions = this.filterOptions.bind(this);
        this.countrySelected = this.countrySelected.bind(this);
        
        this.state = {
            popoverOpen: false,
            searchValue: '',
            countries: [],
            options: [],
            highlight: null,
            highlightIndex: null
        };
    }

    componentDidMount() {
        this.setState({
            options: this.props.options
        })
    }

    // when typing in search box
    onSearch(e) {
        if (e.target.value !== undefined) {
            this.setState({
                popoverOpen: true,
                searchValue: e.target.value || ''
            });        
            this.filterOptions(e.target.value);
        } else {
            // when clicked anywhere else hide popup
            this.setState({
                popoverOpen: false,
                highlightIndex: null
            }); 
        }
    }

    // when enter key is pressed
    onKeyPress(e) {
        if(e.key === 'Enter') {
            if (this.props.type === 'continent') {
                this.optionSelected(e.target.value);
            } else {
                this.countrySelected(true, e.target.value, 'enter');
            }
        }
    }

    onKeyDown(e) {
        if (e.keyCode === 38) {
            const hindex = this.state.highlightIndex === null ? 1 : this.state.highlightIndex;
            const newval = hindex - 1;
            const index = newval < 0 ? 0 : newval;
            this.setState({
                highlightIndex: index
            }) 
        } else if (e.keyCode === 40) {
            const hindex = this.state.highlightIndex === null ? -1 : this.state.highlightIndex;
            const newval = hindex + 1;
            const len = this.state.options.length;
            const index = newval >= len ? len - 1 : newval;
            this.setState({
                highlightIndex: index
            })             
        }
    }

    // filteroptions typeahead
    filterOptions(value) {
        const values = this.props.options.filter(d => {
            return d.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
        this.setState({
            options: values,
            popoverOpen: values.length > 0 ? true : false
        })        
    }

    // on option selected (continent)
    optionSelected(d) {
        if(this.state.highlightIndex) {
            d = this.state.options[this.state.highlightIndex];
        }
        this.props.onSelectOption(d);
        this.setState({
            popoverOpen: false,
            highlightIndex: null,
            searchValue: d
        });         
    }

    // on selecting a country from dropdown
    countrySelected(selected, d, type='click') {
        let countries = this.state.countries;
        if(type === 'enter') {
            countries = d.split(',').map(k => k.trim())
        } else {
            if (selected) {
                countries = countries.concat([d]);
            } else {
                const index = countries.indexOf(d);
                countries.splice(index, 1);
            }
        }

        // only keep unique values
        countries = countries.filter((v, i, a) => a.indexOf(v) === i);
        
        // save the state
        this.setState({
            popoverOpen: true,
            searchValue: countries.join(','),
            countries: countries
        });

        // send the countries back to parent.
        this.props.onSelectOption( countries.map(d => d.toLowerCase()) );
    }    

    // popover html for filtered options
    options() {
        if(this.props.type === 'continent') {
            return this.state.options.map((d, i) => {
                return <p key={i}
                        className={ (this.state.highlightIndex === i) ? "highlight": ""}
                          onClick={e => { this.optionSelected(d) }}>
                          {d}
                </p>
            });
        } else {
            return this.state.options.map((d, i) => {
                return <p className="country-option" key={i}>
                    <Input type="checkbox" onChange={e => {
                        this.countrySelected(e.target.checked, d);
                    }} />{' '}
                    {d}
                </p>
            });
        }
    }

    render() {
        return (
            <div className="SearchBox">
                <Input type="text"
                        name="search"
                        placeholder={"search " + this.props.type}
                        value={this.state.searchValue}
                        onFocus={this.onSearch}
                        onChange={this.onSearch}
                        onKeyPress={this.onKeyPress}
                        onKeyDown={this.onKeyDown}
                        id={this.props.id}/>
                <Popover placement="bottom"
                        isOpen={this.state.popoverOpen}
                        target={this.props.id}
                        toggle={this.onSearch}>
                    <PopoverHeader>Continents</PopoverHeader>
                    <PopoverBody>
                        {this.options()}
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}

export default SearchBox;