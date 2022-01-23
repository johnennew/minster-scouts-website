import MyComponent from '../../../../slices/TextImageRight';

export default {
  title: 'slices/TextImageRight'
}


export const _DefaultSlice = () => <MyComponent slice={{"variation":"default-slice","name":"Default slice","slice_type":"text_image_right","items":[],"primary":{"textField":[{"type":"paragraph","text":"Amet nulla voluptate enim do.","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=900&h=500&fit=crop"}},"id":"_DefaultSlice"}} />
_DefaultSlice.storyName = 'Default slice'

export const _TextImageLeft = () => <MyComponent slice={{"variation":"textImageLeft","name":"TextImageLeft","slice_type":"text_image_right","items":[],"primary":{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?w=900&h=500&fit=crop"},"textField":[{"type":"paragraph","text":"Aliquip et incididunt labore esse dolore. Eiusmod officia anim excepteur ut anim eiusmod proident proident nostrud et deserunt sit anim nisi.","spans":[]}]},"id":"_TextImageLeft"}} />
_TextImageLeft.storyName = 'TextImageLeft'

export const _TitleImage = () => <MyComponent slice={{"variation":"titleImage","name":"TitleImage","slice_type":"text_image_right","items":[],"primary":{"title":[{"type":"heading2","text":"Utilize extensible networks","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=500&fit=crop"}},"id":"_TitleImage"}} />
_TitleImage.storyName = 'TitleImage'
