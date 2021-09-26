import { RouteRecordRaw } from 'vue-router';

interface AsyncDataContextType {
  route: RouteRecordRaw;
  store: any;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    asyncData?(context: AsyncDataContextType): Promise<any>;
  }
}
