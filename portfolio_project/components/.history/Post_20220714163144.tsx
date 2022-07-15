import { Container } from "@chakra-ui/react"
import React,{FC} from "react"
import Image from "next/image"
const Post: FC<{userName:string,userAvatar:string,postImage:string}> = ({userName,userAvatar,postImage })=>{

    return (<Container>

        <Container>

        </Container>
        <Image src={postImage} alt={""} />
        
    </Container>)
}
export default Post