import React, {useEffect, useState, useCallback} from "react";
import './detail.css'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {useHttp} from "../../hooks/http.hook";
import {EditHero} from "../../components/EditHeroModal/editHero";
import {Col, Preloader, Row} from "react-materialize";



export const DetailPage = (props) => {
    const params  = props.match.params.id


    const {loading, request, error, clearError} = useHttp()
    const [items, setItems] = useState(
        {
            nickname: '',
            realName: '',
            originDescription: '',
            superpowers: '',
            catchPhrase: ''
    })




    const load = useCallback(async () => {
        if (params) {
            console.log('TEST', params)
            const data = await request(`/api/hero/${params}`, 'GET', null, {'Authorization': `Bearer `}, false)
            if (data.response === 200) {
                setItems({...data.data})
            }

            if (!loading) {
                console.log(data)
                return data
            }
        }

    }, [request])

    useEffect(() => {
        load()
    }, [load])



    const images = [];

    if (items.image) {
        items.image.forEach(el => {
            images.push({original: el.path})
        })
    }

    if (!items.nickname) {
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
        <div className='details'>
            <div className="col s12 m7">
                <h2 className="header">Your hero is already here!</h2>
                <div className="card horizontal">
                    <div className="card-image col s6 m6">
                        <ImageGallery items={images} showThumbnails={false}  showFullscreenButton={false} showPlayButton={false} />;
                    </div>
                    <div className="card-stacked col s6 m6">
                        <div className="card-content details__content">
                            <span>nickname: <p>{items.nickname}</p></span>
                            <span>Real-name: <p>{items.realName}</p></span>
                            <span>Description: <p>{items.originDescription}</p></span>
                            <span>superpowers: <p>{items.superpowers}</p></span>
                            <span>catch phrase:
                                <p>{items.catchPhrase}</p>
                            </span>
                            <EditHero  item ={items} />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default DetailPage