import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if(!user || user.id != 1){
    alert('Bạn không có quyền sử dụng chức năng này');
    router.navigate(['/login'])
    return false;
  }

  return true;
};
