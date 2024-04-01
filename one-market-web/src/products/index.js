import './index.css';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

function ProductsPageComponent() {
    const history = useHistory();
    return (
        <div id="products">
            <h1 id="product-headline">중고거래</h1>
            <Button
                id="product-upload"
                size="large"
                onClick={() => history.push('/upload')}
                icon={<DownloadOutlined />}
            >
                상품 업로드
            </Button>
            <div id="product-wrap">
                <Link to="/product" className="product-card">
                    <div>
                        <img className="product-img" src="images/notebook1.jpg" alt="product-img" />
                    </div>
                    <div className="product-contents">
                        <span className="product-name">맥북 16인치</span>
                        <span className="product-price">300000원</span>
                        <div className="product-footer">
                            <div className="product-seller">
                                <img className="product-avatar" src="images/avatar.png" alt="profile-img" />
                                <span>임재원</span>
                            </div>
                            <span className="product-date">2024-03-26</span>
                        </div>
                    </div>
                </Link>
                <Link to="/product" className="product-card">
                    <div>
                        <img className="product-img" src="images/notebook1.jpg" alt="product-img" />
                    </div>
                    <div className="product-contents">
                        <span className="product-name">맥북 16인치</span>
                        <span className="product-price">300000원</span>
                        <div className="product-footer">
                            <div className="product-seller">
                                <img className="product-avatar" src="images/avatar.png" alt="profile-img" />
                                <span>임재원</span>
                            </div>
                            <span className="product-date">2024-03-26</span>
                        </div>
                    </div>
                </Link>
                <Link to="/product" className="product-card">
                    <div>
                        <img className="product-img" src="images/notebook1.jpg" alt="product-img" />
                    </div>
                    <div className="product-contents">
                        <span className="product-name">맥북 16인치</span>
                        <span className="product-price">300000원</span>
                        <div className="product-footer">
                            <div className="product-seller">
                                <img className="product-avatar" src="images/avatar.png" alt="profile-img" />
                                <span>임재원</span>
                            </div>
                            <span className="product-date">2024-03-26</span>
                        </div>
                    </div>
                </Link>
                <Link to="/product" className="product-card">
                    <div>
                        <img className="product-img" src="images/notebook1.jpg" alt="product-img" />
                    </div>
                    <div className="product-contents">
                        <span className="product-name">맥북 16인치</span>
                        <span className="product-price">300000원</span>
                        <div className="product-footer">
                            <div className="product-seller">
                                <img className="product-avatar" src="images/avatar.png" alt="profile-img" />
                                <span>임재원</span>
                            </div>
                            <span className="product-date">2024-03-26</span>
                        </div>
                    </div>
                </Link>
                <Link to="/product" className="product-card">
                    <div>
                        <img className="product-img" src="images/notebook1.jpg" alt="product-img" />
                    </div>
                    <div className="product-contents">
                        <span className="product-name">맥북 16인치</span>
                        <span className="product-price">300000원</span>
                        <div className="product-footer">
                            <div className="product-seller">
                                <img className="product-avatar" src="images/avatar.png" alt="profile-img" />
                                <span>임재원</span>
                            </div>
                            <span className="product-date">2024-03-26</span>
                        </div>
                    </div>
                </Link>
                <Link to="/product" className="product-card">
                    <div>
                        <img className="product-img" src="images/notebook1.jpg" alt="product-img" />
                    </div>
                    <div className="product-contents">
                        <span className="product-name">맥북 16인치</span>
                        <span className="product-price">300000원</span>
                        <div className="product-footer">
                            <div className="product-seller">
                                <img className="product-avatar" src="images/avatar.png" alt="profile-img" />
                                <span>임재원</span>
                            </div>
                            <span className="product-date">2024-03-26</span>
                        </div>
                    </div>
                </Link>
                <Link to="/product" className="product-card">
                    <div>
                        <img className="product-img" src="images/notebook1.jpg" alt="product-img" />
                    </div>
                    <div className="product-contents">
                        <span className="product-name">맥북 16인치</span>
                        <span className="product-price">300000원</span>
                        <div className="product-footer">
                            <div className="product-seller">
                                <img className="product-avatar" src="images/avatar.png" alt="profile-img" />
                                <span>임재원</span>
                            </div>
                            <span className="product-date">2024-03-26</span>
                        </div>
                    </div>
                </Link>
                <Link to="/product" className="product-card">
                    <div>
                        <img className="product-img" src="images/notebook1.jpg" alt="product-img" />
                    </div>
                    <div className="product-contents">
                        <span className="product-name">맥북 16인치</span>
                        <span className="product-price">300000원</span>
                        <div className="product-footer">
                            <div className="product-seller">
                                <img className="product-avatar" src="images/avatar.png" alt="profile-img" />
                                <span>임재원</span>
                            </div>
                            <span className="product-date">2024-03-26</span>
                        </div>
                    </div>
                </Link>
                <Link to="/product" className="product-card">
                    <div>
                        <img className="product-img" src="images/notebook1.jpg" alt="product-img" />
                    </div>
                    <div className="product-contents">
                        <span className="product-name">맥북 16인치</span>
                        <span className="product-price">300000원</span>
                        <div className="product-footer">
                            <div className="product-seller">
                                <img className="product-avatar" src="images/avatar.png" alt="profile-img" />
                                <span>임재원</span>
                            </div>
                            <span className="product-date">2024-03-26</span>
                        </div>
                    </div>
                </Link>
                <Link to="/product" className="product-card">
                    <div>
                        <img className="product-img" src="images/notebook1.jpg" alt="product-img" />
                    </div>
                    <div className="product-contents">
                        <span className="product-name">맥북 16인치</span>
                        <span className="product-price">300000원</span>
                        <div className="product-footer">
                            <div className="product-seller">
                                <img className="product-avatar" src="images/avatar.png" alt="profile-img" />
                                <span>임재원</span>
                            </div>
                            <span className="product-date">2024-03-26</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default ProductsPageComponent;
