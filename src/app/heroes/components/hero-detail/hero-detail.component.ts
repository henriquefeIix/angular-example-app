import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { Location } from '@angular/common';
import { HeroService } from '../../../core/services/hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero!: Hero;
  isEditing!: boolean;

  constructor(
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId === 'new') {
      this.isEditing = false;
      this.hero = { name: '' } as Hero;
    } else {
      this.isEditing = true;
      const id = Number(Number(paramId));
      this.heroService.getOne(id).subscribe(hero => this.hero = hero);
    }
  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    this.heroService.update(this.hero).subscribe(() => this.goBack());
  }

  create(): void {
    this.heroService.update(this.hero).subscribe(() => this.goBack());
  }

  isFormValid(): boolean {
    return !! this.hero.name.trim();
  }

}
