<?php

namespace App\Repository;

use App\Models\Flag;
use Illuminate\Support\Collection;

class FlagRepository extends AbstractRepository
{
    public function __construct()
    {
        parent::__construct(Flag::class);
    }


    /**
     * @return Collection
     */
    public function findAll(): Collection
    {
        return $this->getQueryBuilder()->get();
    }

    /**
     * @param string $title
     * @param string $colorCode
     * @return bool
     */
    public function create(string $title, string $colorCode): bool
    {
        return $this->getQueryBuilder()
            ->insert([
                'title' => $title,
                'color_code' => $colorCode,
                'created_at' => now()
            ]);
    }
}
