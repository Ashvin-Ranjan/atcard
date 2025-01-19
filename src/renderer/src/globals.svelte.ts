type Routes = 'home'

interface Globals {
  route: Routes;
}

export const globals: Globals = $state({
  route: 'home'
});