import { ArticleList } from "./ArticleList";
import { Footer } from "./Footer";
import { Titre } from "./Titre";

export function ArticleView({ navigation }) {
  return (
    <>
      <Titre title="Articles" />
      <ArticleList />
      <Footer navigation={navigation} />
    </>
  );
}
