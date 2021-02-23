import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router";
import {Button, Modal} from "react-materialize";
import {useForm} from "react-hook-form";
import {useHttp} from "../../hooks/http.hook";

export const EditHero = (props) => {

    const {loading, request, error, clearError} = useHttp()

    useEffect(() => {
        setHero({...props.item})
    }, [])


    const {register, handleSubmit, watch, errors} = useForm()
    const history = useHistory()
    const [hero, setHero] = useState({
        currentFile: [],
        previewImage: [],
        nickname: '',
        realName: '',
        originDescription: '',
        superpowers: '',
        catchPhrase: ''

    })


    const onSubmit = async () => {
        let formData = new FormData()
        formData.append("nickname", hero.nickname)
        formData.append("realName", hero.realName)
        formData.append("originDescription", hero.originDescription)
        formData.append("superpowers", hero.superpowers)
        formData.append("catchPhrase", hero.catchPhrase)
        formData.append("ImagesArr", hero.ImagesArr)

        try {
            const data = await request('/api/hero/edit', 'POST', formData, {}, true)
            console.log(data)
            if (!loading) {
                history.push(`/detail/${data.data.hero}`)
            }

        } catch (e) {
        }
    }

    return (
        <Modal
            actions={[
                <Button flat modal="close" node="button" waves="green">Close</Button>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header="Modal Header"
            id="Modal-0"
            open={false}
            options={{
                dismissible: true,
                endingTop: '10%',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: '4%'
            }}
            trigger={<Button node="button">Edit hero</Button>}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name='nickname' placeholder="Nickname" type="text"
                       ref={register({required: true})}
                       onChange={e => setHero({...hero, [e.target.name]: e.target.value})} value={hero.nickname} />
                <input name='realName' placeholder="Real-name" type="text"
                       ref={register({required: true})}
                       onChange={e => setHero({...hero, [e.target.name]: e.target.value})} value={hero.realName} />
                <input name='originDescription' placeholder="Description.." type="text"
                       ref={register({required: true})}
                       onChange={e => setHero({...hero, [e.target.name]: e.target.value})} value={hero.originDescription} />
                <input name='superpowers' placeholder="Superpowers.." type="text"
                       ref={register({required: true})}
                       onChange={e => setHero({...hero, [e.target.name]: e.target.value})} value={hero.superpowers} />
                <input name='catchPhrase' placeholder="Catch phrase.." type="text"
                       ref={register({required: true})}
                       onChange={e => setHero({...hero, [e.target.name]: e.target.value})} value={hero.catchPhrase} />

                <div className="sendMail__options">
                    <Button variant="contained" color="primary" type="submit"
                            className="sendMail__send">Send</Button>
                </div>
            </form>
        </Modal>
    )
}