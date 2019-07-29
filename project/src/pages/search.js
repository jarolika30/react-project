import React from "react";
import './search.css';

class Search extends React.Component {
    constructor({data}) {
        super({data});
        this.data = data;
        this.state = {
          searchTerm: '',
        };
        this.state.searchResult = [];
        if (this.data.allJavascriptFrontmatter)
          this.state.allItems = this.data.allJavascriptFrontmatter.edges;
        else this.state.allItems = [];
        this.onChange = this.onChange.bind(this);
    } 
    onChange(e) {
        const value = e.target.value;
        let searchRes = [];
        this.setState( { searchTerm: value});
        if (value !== '') {
          searchRes = this.state.allItems.filter(item => {
            return item.node.frontmatter.name
                .concat(item.node.frontmatter.place_of_birth)
                .toLowerCase()
                .includes(value.toLowerCase());
          });
        }
        this.setState({ searchResult: searchRes });
        console.log('val ' + value);
        
    }
    render() {
      return (
        <div className="container">
          <h1>Белорусские режиссёры театра</h1>
          <form action="">
            <input
              type="search"
              placeholder="Begin your search..."
              value={this.state.searchTerm}
              onChange={this.onChange}
            />
            <div class="fa fa-search"></div>
          </form>
          <div className="search-result">
              { 
                this.state.searchResult.map(item => <a key={item.node.frontmatter.id} href={item.node.frontmatter.path}>{item.node.frontmatter.name}</a>)
              }
          </div>
        </div>
      )
    }
}

export default Search;

export const queryResult = graphql`
  query MyQuery {
    allJavascriptFrontmatter {
      edges {
        node {
          id
          frontmatter {
            id
            name
            date
            path
            place_of_birth
          }
        }
      }
    }
  }
`