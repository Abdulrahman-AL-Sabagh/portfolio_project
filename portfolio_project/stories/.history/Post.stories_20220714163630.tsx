import { ComponentMeta } from "@storybook/react/dist/ts3.9/client/preview/types-6-3"
import Post from "../components/Post"


export default {
  title: "Example/Post",
  component: Post,

  
}as ComponentMeta<typeof Post>
const Template: ComponentStory<typeof Post> = (args) => <Button {...args} />;
