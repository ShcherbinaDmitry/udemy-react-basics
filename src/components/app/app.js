import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import nextId, {setPrefix} from 'react-id-generator';
import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        setPrefix('react-id-');

        this.state = {
            data : [
                {label:'Going to learn React', important: true, like: false, id:nextId()},
                {label:'Try to live your live to the fullest', important: false, like: false, id:nextId()},
                {label:'Find something to live for', important: false, like: false, id:nextId()},
            ],
            term: '',
            filter: 'all'
        };

    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const newArr = [...data.slice(0, index), ...data.slice(index + 1)]

            return {
                data: newArr
            }
        });
    }

    addItem = (body) => {
        const newItem = {
            label: body, 
            important: false, 
            id: nextId()
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
        
            return {
                data: newArr
            }
        })
    }


    onToggle = (id, keyword) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];

            const newItem = {...old};
            newItem[keyword] = !old[keyword];

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    searchPost = (items, term) => {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.label.indexOf(term) > -1
        });
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);


        return (
            <div className='app'>
                <AppHeader 
                liked={liked}
                allPosts={allPosts}/>
                <div className='search-panel d-flex'>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                posts={visiblePosts}
                onDelete={this.deleteItem}
                onToggle={this.onToggle}
                onToggleLiked={this.onToggle}/>
                <PostAddForm
                onAdd={this.addItem}/>
            </div>
        )
    }
}
