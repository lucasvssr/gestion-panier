import { ScrollView } from "react-native";
import { useArticlesContext } from "../hooks/useArticlesContext";
import { Article } from "./Article";

export function ArticleList() {
  const { state } = useArticlesContext();
  const { articles } = state;

  return (
    <ScrollView
      style={{ width: "auto", flexGrow: 1, backgroundColor: "#2F232A" }}
    >
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </ScrollView>
  );
}
