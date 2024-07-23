import './index.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function MainPageComponent() {
    const history = useHistory();

    useEffect(() => {
        const timer = setTimeout(() => {
            history.push('/products');
        }, 3000)
        return () => clearTimeout(timer);
    })

    return (
        <div>
            <section id="main">
                <section id="banner">
                    <img src="/images/banner.png" alt="banner-img" />
                </section>
            </section>
        </div>
    );
}

export default MainPageComponent;
