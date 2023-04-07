<?php

namespace App\Repository;

use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;

abstract class AbstractRepository
{
    private string $table;

    /**
     * @param string $model
     */
    public function __construct(string $model)
    {
        $this->table = (new $model())->getTable();
    }

    /**
     * @return Builder
     */
    protected function getQueryBuilder() : Builder
    {
        return DB::table($this->table);
    }
}
