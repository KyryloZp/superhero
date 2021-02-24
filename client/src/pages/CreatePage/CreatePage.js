import React, {useState, useEffect} from "react";
import './create.css'
import {useForm} from "react-hook-form";
import {Button} from "react-materialize";
import {useHttp} from "../../hooks/http.hook";
import {useHistory} from "react-router";
import PhotoLine from "../../components/PhotoLine/PhotoLine";

export const CreatePage = () => {

    const {loading, request, error, clearError} = useHttp()
    const history = useHistory()
    const {register, handleSubmit, watch, errors} = useForm()
    const [hero, setHero] = useState({
        currentFile: [],
        previewImage: [],
        nickname: '',
        realName: '',
        originDescription: '',
        superpowers: '',
        catchPhrase: ''

    })


    const selectFile = (event) => {
        if (event.target.files.length === 0) return
        setHero({
            ...hero,
            currentFile: [...hero.currentFile, event.target.files[0]],
            previewImage: [...hero.previewImage, URL.createObjectURL(event.target.files[0])]
        })

    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const onSubmit = async () => {
        let formData = new FormData()
        hero.currentFile.forEach(el => {
            formData.append("heroImage", el);
            formData.append("currentFile", hero.currentFile);
            formData.append("nickname", hero.nickname);
            formData.append("realName", hero.realName);
            formData.append("originDescription", hero.originDescription);
            formData.append("superpowers", hero.superpowers);
            formData.append("catchPhrase", hero.catchPhrase);
        })

        try {
            const data = await request('/api/hero/create', 'POST', formData, {}, true)
            if (!loading) {
                history.push(`/detail/${data.data.hero}`)
            }

        } catch (e) {
        }
    }


    return (
        <div className='create'>
            <div className="row create__wrapper">
                <div className="col s12 m6 create__card">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">New hero is waiting for you!</span>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input name='nickname' placeholder="Nickname" type="text"
                                       ref={register({required: true})}
                                       onChange={e => setHero({...hero, [e.target.name]: e.target.value})}/>
                                <input name='realName' placeholder="Real-name" type="text"
                                       ref={register({required: true})}
                                       onChange={e => setHero({...hero, [e.target.name]: e.target.value})}/>
                                <input name='originDescription' placeholder="Description.." type="text"
                                       ref={register({required: true})}
                                       onChange={e => setHero({...hero, [e.target.name]: e.target.value})}/>
                                <input name='superpowers' placeholder="Superpowers.." type="text"
                                       ref={register({required: true})}
                                       onChange={e => setHero({...hero, [e.target.name]: e.target.value})}/>
                                <input name='catchPhrase' placeholder="Catch phrase.." type="text"
                                       ref={register({required: true})}
                                       onChange={e => setHero({...hero, [e.target.name]: e.target.value})}/>
                                <div className="create__upload">
                                    <input className='create__uploadInput'
                                           name='photo'
                                           placeholder="Photo of hero"
                                           accept="image/*"
                                           type="file"
                                           ref={register({required: true})}
                                           onChange={selectFile}/>
                                    <div className="create__uploadImages">
                                        {hero.previewImage.length !== 0 &&
                                        hero.previewImage.map((el) =>
                                            <PhotoLine el={el} key={el.name} hero={hero} setHero={setHero}/>
                                        )}
                                    </div>
                                </div>

                                <div className="sendMail__options">
                                    <Button variant="contained" color="primary" type="submit"
                                            className="sendMail__send">Send</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default CreatePage