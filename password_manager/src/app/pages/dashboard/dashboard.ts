import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { InputOtpModule } from 'primeng/inputotp';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { loginRegister } from '../../models/loginRegister.models';
import { LoginRegisterService } from '../../services/loginRegister.services';
import { DashboardService } from '../../services/dashboard.services';
import { logout } from '../../models/logout.models';
import { vaultListe } from '../../models/vaultList.models';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { secretkey } from '../../models/secretkey.models';
import { infoCoffre } from '../../models/infoCoffre.models';
import { newVault } from '../../models/newVault.models';
import { DropdownModule } from 'primeng/dropdown';
import { categories } from '../../models/categories.models';
import { addCategorie } from '../../models/addCategorie.models';
import { DialogModule } from 'primeng/dialog';
import { PrimeIcons } from 'primeng/api';
import { vaultGroup } from '../../models/vaultGroup.models';
import { SelectButtonModule } from 'primeng/selectbutton';
import { admin, users } from '../../models/admin.models';
import {
  adminAllPassword,
  coffres,
} from '../../models/adminAllPassword.models';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AuthService } from '../../services/auth.services';
@Component({
  standalone: true,
  imports: [
    AvatarModule,
    AvatarGroupModule,
    RouterOutlet,
    InputTextModule,
    PasswordModule,
    CommonModule,
    ButtonModule,
    TooltipModule,
    FormsModule,
    RouterLink,
    MessagesModule,
    InputOtpModule,
    TableModule,
    SidebarModule,
    DialogModule,
    DropdownModule,
    SelectButtonModule,
  ],

  providers: [MessageService, BrowserModule, PrimeIcons],

  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  loginData: loginRegister | null = null;
  infoCoffre!: infoCoffre;
  listGroupVault!: Array<vaultGroup>;
  newVault!: newVault;
  listCategories!: Array<categories>;
  listelibCategorie!: string[];
  listeidCategorie!: string[];
  listeAdminUsers!: Array<users>;
  listeAdminAllPassword!: Array<coffres>;
  sidebarVisible = false;
  addMenuVault = false;
  visibleAddCategorie = false;
  newCategorie = '';
  isModified = false;
  visibleCreateGroup = false;
  visibleAddAdmin = false;
  groupName = '';
  urllogo = '';
  urlsite = '';
  email = '';
  username = '';
  password = '';
  newAdmin = '';
  note = '';
  sitename = '';
  selectedOption: string = 'passwords';
  stateOptions: any[] = [
    { label: 'Mots de passes', value: 'passwords' },
    { label: 'Administration', value: 'admin' },
  ];
  selectedCategory: categories | null = null;
  constructor(
    private loginRegisterService: LoginRegisterService,
    private dashboardService: DashboardService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
  ) {}
  vaultListe: Array<vaultListe> = [];
  ngOnInit(): void {
    this.loginData = this.loginRegisterService.getLoginData(); // Récupérer les données de connexion
    console.log(this.loginData.isAdmin);
    this.dashboardService.ShowAllVault(this.loginData.access_token).subscribe({
      next: (response: vaultListe[]) => {
        this.vaultListe = response;
      },
    });
    this.dashboardService
      .showGroupVault(this.loginData.access_token)
      .subscribe({
        next: (response: vaultGroup[]) => {
          this.listGroupVault = response;
          console.log(this.listGroupVault);
        },
      });

    if (this.loginData.isAdmin === 1) {
      this.dashboardService.adminList(this.loginData.access_token).subscribe({
        next: (reponse: admin) => {
          this.listeAdminUsers = reponse.users;
        },
      });

      this.dashboardService
        .showAllPasswords(this.loginData.access_token)
        .subscribe({
          next: (reponse: adminAllPassword) => {
            this.listeAdminAllPassword = reponse.coffres;
          },
        });
    }
  }

  disconnect(acces_token: string) {
    this.dashboardService.disconnect(acces_token).subscribe({
      next: (response: logout) => {
        console.log('Authentification successful', response);
        this.authService.logout(this.loginData);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Authentification error', error);
      },
    });
  }

  InfoCoffre(uuidCoffre: string) {
    if (this.loginData != null) {
      const data = this.loginData;
      this.dashboardService
        .SecretKey(uuidCoffre, data.access_token)
        .pipe(
          switchMap((secretkey: secretkey) => {
            if (secretkey) {
              return this.dashboardService
                .getInfoCoffre(uuidCoffre, secretkey.key, data.access_token)
                .pipe(
                  tap((infoCoffre: infoCoffre) => {
                    this.infoCoffre = infoCoffre;
                    this.sidebarVisible = true;
                  })
                );
            } else {
              // Gérer le cas où secretkey est null
              return throwError('La clé secrète est null');
            }
          }),
          catchError((error) => {
            console.error('Erreur:', error);
            return throwError(error);
          })
        )
        .subscribe();
    }
  }

  AddVault() {
    if (this.loginData != null) {
      this.addMenuVault = true;
      this.dashboardService
        .getCategorie(this.loginData.access_token)
        .subscribe({
          next: (response: categories[]) => {
            this.listCategories = response;
            console.log(this.listCategories);
          },
        });
    }
  }
  handleAddVault(
    urllogo: string,
    sitename: string,
    urlsite: string,
    email: string,
    username: string,
    password: string,
    note: string
  ) {
    if (
      urllogo == '' ||
      sitename == '' ||
      urlsite == '' ||
      email == '' ||
      username == '' ||
      password == '' ||
      note == ''
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Champs vide',
        detail: 'Champ vide veuillez tout compléter ',
      });
    } else {
      if (this.loginData != null) {
        const uuidcategorie = '';
        this.dashboardService
          .addVault(
            this.loginData.access_token,
            urllogo,
            sitename,
            urlsite,
            email,
            username,
            password,
            note,
            uuidcategorie
          )
          .subscribe({
            next: (response: any) => {
              console.log(response);
            },
          });
      }
    }
  }

  onAddVaultHide() {
    this.addMenuVault = false;
  }

  showAddCategorie() {
    this.visibleAddCategorie = true;
  }

  addNewCategorie() {
    if (this.loginData != null) {
      this.dashboardService
        .addNewCategorie(this.loginData.access_token, this.newCategorie)
        .subscribe({
          next: (response: addCategorie) => {
            this.visibleAddCategorie = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Nouvelle Catégorie',
              detail: 'Un nouvelle catégorie à été ajouté ',
            });
          },
          error: (error) => {
            console.error('Authentification error', error);
          },
        });
    }
  }

  onSidebarHide() {
    this.sidebarVisible = false;
  }

  onFieldChange() {
    this.isModified = true;
  }

  ModifVault(infoCoffre: infoCoffre) {
    if (this.loginData != null) {
      const data = this.loginData;
      this.dashboardService
        .SecretKey(infoCoffre.uuidCoffre, data.access_token)
        .subscribe({
          next: (secretkey: secretkey) => {
            if (secretkey != null) {
              this.dashboardService
                .modifVault(
                  infoCoffre.uuidCoffre,
                  secretkey.key,
                  data.access_token,
                  infoCoffre.email,
                  infoCoffre.note,
                  infoCoffre.password,
                  infoCoffre.sitename,
                  infoCoffre.urllogo,
                  infoCoffre.urlsite,
                  infoCoffre.username
                )
                .subscribe({
                  next: (response: any) => {
                    console.log(response);
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Changement',
                      detail: 'Changement mise à jour ',
                    });
                    this.isModified = false;
                  },
                });
            }
          },
          error: (error) => {
            console.error('Authentification error', error);
          },
        });
    }
  }

  DeleteVault(uuidCoffre: string) {
    if (this.loginData != null) {
      this.dashboardService
        .deleteVault(uuidCoffre, this.loginData.access_token)
        .subscribe({
          next: (response: any) => {
            console.log(response);
          },
        });
    }
  }

  showCreateGroup() {
    this.visibleCreateGroup = true;
  }
  CreateGroupe(groupName: string) {
    if(this.loginData!=null){
      this.dashboardService
      .createGroup(groupName, this.loginData.access_token)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
      });
    }
    
  }

  ShowaddAdmin() {
    this.visibleAddAdmin = true;
  }

  AddAdmin(email: string) {
    if(this.loginData!=null){
       this.dashboardService
      .NewAdmin(email, this.loginData.access_token)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
      });
  }
    }
   
}
