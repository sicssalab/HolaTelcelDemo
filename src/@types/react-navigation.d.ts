import type { User } from "~src/@types/User";
import type { SceneName } from "~src/@types/SceneName";

export type RootStackParamList = {
  [SceneName.Swipe]: undefined;
  [SceneName.Messages]: undefined;
  [SceneName.Profile]: undefined;

  [SceneName.Entertainment]: undefined;
  [SceneName.Avenues]: undefined;
  [SceneName.Experience]: undefined;
  [SceneName.MagicTowns]: undefined;
  [SceneName.MenuProfile]: undefined;
  [SceneName.Home]: NavigatorScreenParams<undefined>;


  [SceneName.Chat]: { user: User };
  [SceneName.Story]: { index: number };
  [SceneName.Authentication]: undefined;
  [SceneName.OneTimeCode]: undefined;
  [SceneName.Registration]: undefined;
  [SceneName.UserProfile]: { user: User };
  [SceneName.EditProfile]: undefined;
  [SceneName.ProfileScreen]: { post : any };
  [SceneName.ModalView]: { post : any };

};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
