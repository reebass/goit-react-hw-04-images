import React, { Component } from 'react';
import { Header, SearchButton, SearchForm, SearchInput } from './Searchbar.styled';
import { BiSearch } from 'react-icons/bi'
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    searchQuery: '',
  };


  hendleSearchQuery = evt => {
    this.setState({searchQuery: evt.currentTarget.value.toLowerCase()})
  }

  hendleSubmit = evt => {
    const {searchQuery} = this.state
    const {onSubmit} = this.props

    evt.preventDefault()
    if(searchQuery.trim() === "") {
      toast.error("Please enter a request")
      return
    }
    onSubmit(searchQuery);
    this.setState({searchQuery: ""})
  }

  render() {
    const {searchQuery} = this.state

    return (
      <Header className="searchbar">
        <SearchForm className="form" onSubmit={this.hendleSubmit}>
          <SearchButton type="submit" className="button">
            <BiSearch size={20}/>
          </SearchButton>

          <SearchInput
            value={searchQuery}
            onChange={this.hendleSearchQuery}
            className="input"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}
