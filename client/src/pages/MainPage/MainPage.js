import React, {useEffect, useState, useCallback} from "react";
import './mainPage.css'
import {Col, Icon, Pagination, Preloader, Row} from "react-materialize";
import {useHttp} from "../../hooks/http.hook";
import {Card} from "../../components/Card/Card";


export const MainPage = () => {
    const {loading, request, error, clearError} = useHttp()
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsOnPage, setItemsOnPage] = useState(5)


    const load = useCallback(async () => {

        const data = await request(`/api/hero?page=${currentPage}&limit=${itemsOnPage}`, 'GET', null, {'Authorization': `Bearer `}, false)
        if (data.response === 200) {
            setItems([...data.data])
        }

        if (!loading) {
            return data
        }
    }, [request, currentPage])

    useEffect(() => {
        load()
    }, [load, currentPage])


    if (items.length === 0) {
        return <Row>
            <Col s={4}>
                <Preloader
                    active
                    color="blue"
                    flashing={false}
                    size="big"
                />
            </Col>
        </Row>
    }

    return (
        <div className="main">
            <div className="main__content">
                <div className="row">
                    <div className="col s12">
                        <h3 className='main__title'>Choose your hero!</h3>
                    </div>
                    {items.length !== 0 && items.map(el => <Card key={el._id} className='main__card' item={el}/>)}
                </div>
            </div>
            <div className="main__pagination col s12">
                <Pagination
                    activePage={currentPage}
                    items={items.length !== 0 &&
                    Math.round(items[0].portionPage)}
                    leftBtn={<Icon  >chevron_left</Icon>}
                    maxButtons={items.length !== 0 && Math.round(items[0].portionPage)}
                    rightBtn={<Icon>chevron_right</Icon>}
                    onSelect={e => setCurrentPage(e)}
                />
            </div>
        </div>
    )
}

export default MainPage;