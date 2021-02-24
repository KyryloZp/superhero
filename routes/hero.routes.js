const {Router} = require('express')
const Hero = require('../models/Hero')
const multer = require('multer')
const fs = require('fs')

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'upload');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage})

// /api/hero/create

router.post(
    '/create', [upload.any('heroImage')],
    async (req, res) => {


        let nickname = ''
        Array.isArray(req.body.nickname) ? nickname = req.body.nickname[0] : nickname = req.body.nickname


        try {
            const candidate = await Hero.findOne({nickname: nickname.toLowerCase()})

            if (candidate) {
                return res.status(400).json({message: "Такой супергерой уже существует"})
            }


            const hero = new Hero()


            hero.nickname = nickname.toLowerCase()
            hero.realName = req.body.realName[0]
            hero.originDescription = req.body.originDescription[0]
            hero.superpowers = req.body.superpowers[0]
            hero.catchPhrase = req.body.catchPhrase[0]

            for (let key of req.files) {
                let img = fs.readFileSync(key.path);
                let encode_image = img.toString('base64');
                // `data:${key.contentType};base64,${key.path}`
                //hero.image.push({path: encode_image, contentType: key.mimetype, originalName: key.originalname})
                hero.image.push({path: `data:${key.mimetype};base64,${encode_image}`, contentType: key.mimetype, originalName: key.originalname})
            }


            await hero.save()
            res.status(201).json({message: "Новый герой создан", hero: hero.nickname})


        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!'})
        }
    })

// /api/hero/edit

router.post(
    '/edit', [upload.any('heroImage')],
    async (req, res) => {


        try {

            const hero = await Hero.update({nickname : req.body.nickname}, req.body)

            res.status(201).json({message: "Новый герой создан", hero: req.body.nickname})


        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!'})
        }
    })



// /api/hero

router.get(
    '/', [],
    async (req, res) => {
        try {
            let page = req.query.page;
            let limitOnPage = +req.query.limit;
            let leftPortionPageNumber = (page - 1) * (limitOnPage + 1);

            const itemsCount =  await Hero.count()
            const hero = await Hero.find().skip(leftPortionPageNumber).limit(limitOnPage)
            const hero2 = await Hero.find()
            console.log(hero2)
            const portionPage = itemsCount / limitOnPage;



            let itemsArr = []

            for(let item of hero) {
                let ImagesArr = []
                let {nickname, realName, originDescription, superpowers, catchPhrase, image} = item



/*                for(let key of item.image) {
                    ImagesArr.push(`data:${key.contentType};base64,${key.path}`)
                }*/

                itemsArr.push({nickname, realName, originDescription, superpowers, catchPhrase, image, portionPage})

            }

            res.send(itemsArr)

        }  catch (e) {
            res.status(500).json({message: 'Произошла серверная ошибка, попробуйту позже'})
        }
    })


// /api/hero/heroName

router.get('/:name', [], async (req, res) => {
    try {
        const name = req.params.name
        const hero = await Hero.find({nickname: name.toLowerCase()})
        const {nickname, realName, originDescription, superpowers, catchPhrase, image} = hero[0]



/*        for(let key of hero[0].image) {
            ImagesArr.push(`data:${key.contentType};base64,${key.path}`)
        }*/


        res.send({nickname, realName, originDescription, superpowers, catchPhrase, image})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router