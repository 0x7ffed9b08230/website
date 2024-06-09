interface ArticleType {
    type: string;
    icon: string;
    name?: string;
  }
  
  
  export enum ArticleTypeEnum {
    Tutorial = "tutorial",
    News = "news",
    Article = "article",
  }
  
  export const ArticleTypeList = {
    tutorial: { type: "Tutorials", icon: "📚" } as ArticleType,
    news: { type: "News", icon: "📰" } as ArticleType,
    article: { type: "Articles", icon: "📝" } as ArticleType,
  }
  
  export function GetArticleType(type: ArticleTypeEnum): ArticleType {
    switch (type) {
      case ArticleTypeEnum.Tutorial:
        return { type: "Tutorials", icon: "📚" } as ArticleType;
      case ArticleTypeEnum.News:
        return { type: "News", icon: "📰" } as ArticleType;
      case ArticleTypeEnum.Article:
          return { type: "Articles", icon: "📝" } as ArticleType;
    }
  }
  
  export function GetTypes(): ArticleType[] {
  
    return Object.values(ArticleTypeEnum).map((type) => {
      return {
        type: type,
        icon: GetArticleType(type as ArticleTypeEnum).icon,
        name: GetArticleType(type as ArticleTypeEnum).type,
      }
    });
  }