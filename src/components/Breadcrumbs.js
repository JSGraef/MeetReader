import React from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';

// First thing user sees when they upload a meet
const Breadcrumbs = (props) => {

    const paths = props.path.split('/');
    let pathToNow = '';
    
    return (            
        <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            { paths.map(path => {
                if(path === '') return null;
                
                pathToNow = pathToNow + '/' + path;

                const properPath = path.charAt(0).toUpperCase() + path.slice(1);
                return (
                    <Breadcrumb.Item key={path}>
                        <Link to={pathToNow}>{properPath}</Link>
                    </Breadcrumb.Item>);
            }) }
            
        </Breadcrumb>
    );
}

export default Breadcrumbs;