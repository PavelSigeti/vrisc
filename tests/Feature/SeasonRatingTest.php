<?php

namespace Tests\Feature;

use App\Models\Stage;
use App\Models\StageResult;
use App\Models\Tournament;
use App\Models\User;
use Carbon\Carbon;
use Tests\TestCase;

class SeasonRatingTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config([
            'database.default' => 'sqlite',
            'database.connections.sqlite.database' => ':memory:',
        ]);
        $this->artisan('migrate')->assertExitCode(0);
        $this->travelTo(Carbon::parse('2026-11-01 00:00:00', 'Europe/Moscow'));
    }

    public function test_current_season_shows_points_only_after_the_first_stage_finishes(): void
    {
        $tournament = Tournament::create(['title' => 'Cup', 'yacht' => 'Test']);
        $user = User::factory()->create(['university_id' => null]);
        $previous = $this->stage($tournament, '2026-10-31 23:59:59');
        $older = $this->stage($tournament, '2024-06-15 10:00:00');
        $current = $this->stage($tournament, '2026-11-01T00:00', 'group');

        $this->recordResult($previous, $user, 6);
        $this->recordResult($older, $user, 4);
        $this->recordResult($current, $user, 3);

        $this->getJson('/api/rating/users?year=current')
            ->assertOk()
            ->assertJsonPath('year', 2026)
            ->assertJsonPath('years', [2026, 2025, 2023])
            ->assertJsonCount(0, 'data');
        $this->getJson('/api/rating/users?year=2025')
            ->assertOk()
            ->assertJsonPath('data.0.total', 6);
        $this->getJson('/api/rating/users?year=all')
            ->assertOk()
            ->assertJsonPath('data.0.total', 10);

        $this->travel(-1)->second();
        $this->getJson('/api/rating/users?year=current')
            ->assertOk()
            ->assertJsonPath('year', 2025)
            ->assertJsonPath('data.0.total', 6);
        $this->travelTo(Carbon::parse('2026-11-01 00:00:00', 'Europe/Moscow'));

        $current->update(['status' => 'finished']);

        $this->getJson('/api/rating/users?year=current')
            ->assertOk()
            ->assertJsonPath('data.0.total', 3);
        $this->getJson('/api/rating/users')
            ->assertOk()
            ->assertJsonPath('data.0.total', 13);
        $this->getJson('/api/rating/users?year=2025')
            ->assertOk()
            ->assertJsonPath('data.0.total', 6);
    }

    public function test_pagination_keeps_the_chosen_season(): void
    {
        $tournament = Tournament::create(['title' => 'Cup', 'yacht' => 'Test']);
        $stage = $this->stage($tournament, '2026-06-10 10:00:00');
        $users = User::factory()->count(51)->create(['university_id' => null]);
        StageResult::insert($users->map(fn ($user) => [
            'stage_id' => $stage->id,
            'user_id' => $user->id,
            'result' => 1,
        ])->all());

        $response = $this->getJson('/api/rating/users?year=2025')
            ->assertOk()
            ->assertJsonCount(50, 'data');
        $this->getJson($response->json('next_page_url'))
            ->assertOk()
            ->assertJsonPath('year', 2025)
            ->assertJsonPath('current_page', 2)
            ->assertJsonPath('data.0.user_id', $users->last()->id)
            ->assertJsonCount(1, 'data');
    }

    private function stage(Tournament $tournament, string $raceStart, string $status = 'finished'): Stage
    {
        return $tournament->stages()->create([
            'title' => 'Stage',
            'register_start' => '2024-01-01 00:00:00',
            'register_end' => $raceStart,
            'race_start' => $raceStart,
            'status' => $status,
        ]);
    }

    private function recordResult(Stage $stage, User $user, int $points): void
    {
        StageResult::create([
            'stage_id' => $stage->id,
            'user_id' => $user->id,
            'result' => $points,
        ]);
    }
}
