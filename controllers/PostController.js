
const Post = require('../models/post')

const index = (req ,res) => {
    Post.find().then((result)=>{
      res.render('index',{posts:result})
    }).catch(err=>{console.log(err)})
    }

    const create = (req,res) => {
        res.render('create')
        }


      const post_create = (req,res) => {

        var img = []
        for(var i=0; i<req.files.length; i++){

          img[i] = req.files[i].filename
        }

            const Post1 = new Post({
              title: req.body.title,
              content: req.body.content,
              images: img
            
            }            
              );
            Post1.save()
              .then(() => {      
                res.redirect('/');
              })
              .catch(err => {
                console.log(err);
              })       
            }
     
    
            const details = (req,res) => {
              const id = req.params.id;
              Post.findById(id)
                .then(result => {
                  res.render('details', { post: result});
                })
                .catch(err => {
                  console.log(err);
                })
            }
    
    
            const post_delete = (req,res) => {
              const id = req.params.id;
              Post.findByIdAndDelete(id).then(()=>{
                res.redirect('/')
              })
            }
    
    
            
          const edit = (req,res) => {
              const id = req.params.id;
      Post.findById(id)
        .then(result => {
          res.render('edit', { post: result });
        })
        .catch(err => {
          console.log(err);
        })
    }
    
    
    const post_edit = (req,res) => {
      Post.updateMany({ _id: req.params.id }, {
        title: req.body.title,
        content: req.body.content
      })
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      })
    }

   const  notfound = (req,res)=>{
      res.render('404')
   //   res.redirect('/');
    }

    module.exports = {
        index,
        create,
        post_create,
        details,
        post_delete,
        post_edit,
        edit,
        notfound,
    }